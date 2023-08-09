using System.Linq;
using System.Threading.Tasks;
using Explore.Cms.Helpers.Http;
using Explore.Cms.Models;
using Explore.Cms.Services;
using Explore.Cms.Validation.RoomValidators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Explore.Cms.Trigger.Http;

public class RoomFunction
{
    private readonly IRoomService _roomService;
    private readonly IGuestService _guestService;
    private readonly ITransactionService _transactionService;
    private readonly ILogger<RoomFunction> _logger;

    public RoomFunction(IRoomService roomRepository, IGuestService guestService, ITransactionService transactionService,
        ILogger<RoomFunction> logger)
    {
        _roomService = roomRepository;
        _guestService = guestService;
        _transactionService = transactionService;
        _logger = logger;
    }

    [FunctionName("GetRoom")]
    public async Task<IActionResult> GetRoom(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "rooms/{id}")]
        HttpRequest req, string id)
    {
        var room = await _roomService.GetRoom(ObjectId.Parse(id));

        if (room.Id == ObjectId.Empty) return new NotFoundResult();
        return new OkObjectResult(room);
    }

    [FunctionName("GetRooms")]
    public async Task<IActionResult> GetRooms(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "rooms")]
        HttpRequest req)
    {
        return new OkObjectResult(await _roomService.GetRooms(r => true));
    }

    [FunctionName("GetRoomTransactions")]
    public async Task<IActionResult> GetRoomTransactions(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "rooms/{id}/transactions")]
        HttpRequest req, string id)
    {
        var transactions = (await _transactionService.FindAsync(t => t.RoomId == new ObjectId(id))).ToList();
        return new OkObjectResult(transactions);
    }

    [FunctionName("CreateRoom")]
    public async Task<IActionResult> CreateRoom(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "rooms")] HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Room, CreateRoomValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var room = validatedRequest.Value;
        room.RoomNumber = await GetNextNewRoomNumber();

        try
        {
            await _roomService.AddRoom(room);
            return new OkObjectResult(room);
        }
        catch (MongoWriteException e)
        {
            _logger.LogError(e, "Could not create new room");
            return new ConflictObjectResult("Could not create new room");
        }

    }

    private async Task<int> GetNextNewRoomNumber()
    {
        var rooms = (await _roomService.GetRooms(r => true)).ToList();

        if (!rooms.Any()) return 1;
        return rooms.Select(r => r.RoomNumber).Max() + 1;
    }
}