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
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "room/{id}")]
        HttpRequest req, string id)
    {
        var room = await _roomService.GetRoom(ObjectId.Parse(id));

        if (room.Id == ObjectId.Empty) return new NotFoundResult();
        return new OkObjectResult(room);
    }

    [FunctionName("GetRooms")]
    public async Task<IActionResult> GetRooms(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "room")]
        HttpRequest req)
    {
        return new OkObjectResult(await _roomService.GetRooms(r => true));
    }

    [FunctionName("GetFirstAvailableRoom")]
    public async Task<IActionResult> GetFirstAvailableRoom(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "room/available")]
        HttpRequest req)
    {
        var room = await _roomService.GetNextAvailableRoom();
        return new OkObjectResult(room);
    }

    [FunctionName("GetRoomTransactions")]
    public async Task<IActionResult> GetRoomTransactions(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "room/{id}/transactions")]
        HttpRequest req, string id)
    {
        var transactions = (await _transactionService.FindAsync(t => t.RoomId == new ObjectId(id))).ToList();
        return new OkObjectResult(transactions);
    }

    [FunctionName("UpdateRoom")]
    public async Task<IActionResult> UpdateRoom(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "room")]
        HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Room, UpdateRoomValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var room = validatedRequest.Value;

        var existingRoom = await _roomService.GetRoom(room.Id);
        if (existingRoom.Id == ObjectId.Empty) return new NotFoundObjectResult("Room does not exist.");
        if (existingRoom.Id != room.Id) return new BadRequestObjectResult("Cannot update room id.");
        if (existingRoom.RoomNumber != room.RoomNumber) return new BadRequestObjectResult("Cannot update room number.");

        var updatedRoom = await _roomService.UpdateRoom(room);

        var guestsToAdd = room.GuestIds.Except(existingRoom.GuestIds)
            .Distinct()
            .Select(async gId => await _guestService.FindOneByIdAsync(gId))
            .Select(t => t.Result)
            .ToList();

        var guestsToRemove = existingRoom.GuestIds.Except(room.GuestIds)
            .Select(async gId => await _guestService.FindOneByIdAsync(gId))
            .Select(t => t.Result)
            .Distinct()
            .ToList();

        foreach (var guest in guestsToAdd)
        {
            await _roomService.RemoveGuestFromRoom(guest.RoomId, guest.Id);
            guest.RoomId = room.Id;
            await _guestService.UpdateGuest(guest);
        }

        foreach (var guest in guestsToRemove)
        {
            guest.RoomId = ObjectId.Empty;
            await _guestService.UpdateGuest(guest);
        }

        return new OkObjectResult(updatedRoom);
    }

    [FunctionName("CreateRoom")]
    public async Task<IActionResult> CreateRoom(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "room")] HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Room, CreateRoomValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var room = validatedRequest.Value;
        room.RoomNumber = await GetNextNewRoomNumber();

        await _roomService.AddRoom(room);
        return new OkObjectResult(room);
    }

    private async Task<int> GetNextNewRoomNumber()
    {
        var rooms = (await _roomService.GetRooms(r => true)).ToList();

        if (!rooms.Any()) return 1;
        return rooms.Select(r => r.RoomNumber).Max() + 1;
    }
}