using System.Threading.Tasks;
using Explore.Cms.Helpers.Http;
using Explore.Cms.Models;
using Explore.Cms.Services;
using Explore.Cms.Validation.GuestValidators;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Explore.Cms.Trigger.Http;

public class GuestFunction
{
    private readonly IRoomService _roomService;
    private readonly IGuestService _guestService;
    private readonly ILogger<GuestFunction> _logger;

    public GuestFunction(IRoomService roomService, IGuestService guestService, ILogger<GuestFunction> logger)
    {
        _roomService = roomService;
        _logger = logger;
        _guestService = guestService;
    }

    [FunctionName("GetGuest")]
    public async Task<IActionResult> GetGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "guests/{id}")]
        HttpRequest req, string id)
    {
        var guest = await _guestService.FindOneByIdAsync(ObjectId.Parse(id));

        if (guest.Id == ObjectId.Empty) return new NotFoundResult();
        return new OkObjectResult(guest);
    }

    [FunctionName("GetGuests")]
    public async Task<IActionResult> GetGuests(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "guests")]
        HttpRequest req)
    {
        return new OkObjectResult(await _guestService.FindAsync(g => true));
    }

    [FunctionName("UpdateGuest")]
    public async Task<IActionResult> UpdateGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "guests")]
        HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Guest, UpdateGuestValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();
        
        var guest = validatedRequest.Value;

        var existingGuest = await _guestService.FindOneByIdAsync(guest.Id);
        
        if (existingGuest.Id == ObjectId.Empty) return new NotFoundResult();
        if (guest.RoomId != existingGuest.RoomId) return new BadRequestObjectResult("Cannot change guest room");

        try
        {
            guest = await _guestService.UpdateGuest(guest);
            return new OkObjectResult(guest);
        }
        catch (MongoWriteException e)
        {
            _logger.LogError(e, "Could not update guest");
            return new ConflictObjectResult($"Could not update guest {guest.Id}");
        }
    }

    [FunctionName("CreateGuest")]
    public async Task<IActionResult> CreateGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "guests")]
        HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Guest, CreateGuestValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var guest = validatedRequest.Value;

        guest.Id = ObjectId.GenerateNewId();

        try
        {
            var room = await _roomService.GetNextAvailableRoom();
            await _roomService.AddGuestToRoom(room.Id, guest.Id);
        }
        catch (MongoWriteException e)
        {
            _logger.LogError(e, "Could not assign guest to a room");
            return new ConflictObjectResult($"Could not assign guest {guest.Id} to a room");
        }

        try
        {
            await _guestService.AddOneAsync(guest);
            var createdGuest = await _guestService.FindOneByIdAsync(guest.Id);
            if (createdGuest.Id == ObjectId.Empty) return new ConflictObjectResult($"Could not create guest {guest.Id}");
            return new CreatedResult($"guest/{guest.Id}", createdGuest);
        }
        catch (MongoWriteException e)
        {
            _logger.LogError(e, "Could not create guest");
            return new ConflictObjectResult($"Could not create guest {guest.Id}");
        }

    }

    [FunctionName("DeleteGuest")]
    public async Task<IActionResult> DeleteGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "guests/{id}")]
        HttpRequest req, string id)
    {
        var guest = await _guestService.FindOneByIdAsync(ObjectId.Parse(id));
        
        if (!(await _guestService.DeleteByIdAsync(guest.Id)) || 
            !await _roomService.RemoveGuestFromRoom(guest.RoomId, guest.Id))
            return new NotFoundResult();
        
        return new OkResult();
    }
}