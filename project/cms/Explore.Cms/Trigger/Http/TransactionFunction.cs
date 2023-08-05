using System.Threading.Tasks;
using Explore.Cms.Helpers.Http;
using Explore.Cms.Models;
using Explore.Cms.Services;
using Explore.Cms.Validation.TransactionValidators;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using MongoDB.Bson;

namespace Explore.Cms.Trigger.Http;

public class TransactionFunction
{
    private readonly ITransactionService _transactionService;
    private readonly IRoomService _roomService;
    private readonly ILogger<TransactionFunction> _logger;

    public TransactionFunction(ITransactionService transactionService, IRoomService roomService,
        ILogger<TransactionFunction> logger)
    {
        _transactionService = transactionService;
        _roomService = roomService;
        _logger = logger;
    }

    [FunctionName("GetTransaction")]
    public async Task<IActionResult> GetTransaction(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "transaction/{id}")]
        HttpRequest req, string id)
    {
        var transaction = await _transactionService.FindOneByIdAsync(ObjectId.Parse(id));

        return transaction.Id == ObjectId.Empty ? new NotFoundResult() : new OkObjectResult(transaction);
    }

    [FunctionName("UpdateTransaction")]
    public async Task<IActionResult> UpdateTransaction(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "transaction")]
        HttpRequest req)
    {
        var validatedRequest =
            await HttpRequestHelpers.ValidateRequest<GuestTransaction, UpdateTransactionValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var transaction = validatedRequest.Value;

        var existingTransaction = await _transactionService.FindOneByIdAsync(transaction.Id);
        if (existingTransaction.Id == ObjectId.Empty) return new NotFoundObjectResult("Transaction does not exist.");
        if (existingTransaction.RoomId != transaction.RoomId && transaction.RoomId != ObjectId.Empty)
            return new BadRequestObjectResult("Cannot change room of transaction.");

        await _transactionService.UpdateOneAsync(transaction);
        return new OkObjectResult(transaction);
    }

    [FunctionName("CreateTransaction")]
    public async Task<IActionResult> CreateTransaction(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "transaction")]
        HttpRequest req)
    {
        var validatedRequest =
            await HttpRequestHelpers.ValidateRequest<GuestTransaction, CreateTransactionValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var transaction = validatedRequest.Value;

        var room = await _roomService.FindOneByIdAsync(transaction.RoomId);

        if (room.Id == ObjectId.Empty) return new NotFoundObjectResult("Room does not exist.");

        await _transactionService.AddOneAsync(transaction);
        await _roomService.AddTransactionToRoom(room, transaction);

        return new OkObjectResult(transaction);
    }

    [FunctionName("DeleteTransaction")]
    public async Task<IActionResult> DeleteTransaction(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "transaction/{id}")]
        HttpRequest req, string id)
    {
        var transaction = await _transactionService.FindOneByIdAsync(ObjectId.Parse(id));
        if (transaction.Id == ObjectId.Empty) return new NotFoundResult();

        await _transactionService.DeleteByIdAsync(transaction.Id);
        await _roomService.RemoveTransactionFromRoom(transaction.RoomId, transaction.Id);

        return new OkResult();
    }
}