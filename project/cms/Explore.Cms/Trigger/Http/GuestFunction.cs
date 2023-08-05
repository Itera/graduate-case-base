using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
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
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "guest/{id}")]
        HttpRequest req, string id)
    {
        var guest = await _guestService.FindOneByIdAsync(ObjectId.Parse(id));

        if (guest.Id == ObjectId.Empty) return new NotFoundResult();
        return new OkObjectResult(guest);
    }

    [FunctionName("GetGuests")]
    public async Task<IActionResult> GetGuests(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "guest")]
        HttpRequest req)
    {
        return new OkObjectResult(await _guestService.FindAsync(g => true));
    }

    [FunctionName("UpdateGuest")]
    public async Task<IActionResult> UpdateGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "guest")]
        HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Guest, UpdateGuestValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var guest = validatedRequest.Value;

        var existingGuest = await _guestService.FindOneByIdAsync(guest.Id);
        if (existingGuest.Id == ObjectId.Empty) return new NotFoundResult();

        if (guest.Id != existingGuest.Id) return new BadRequestObjectResult("Cannot change guest id");
        guest = await _roomService.UpdateGuestRoom(guest);
        guest = await _guestService.UpdateGuest(guest);

        return guest.Id == ObjectId.Empty
            ? new ObjectResult($"Could not update guest with id {guest.Id}")
            {
                StatusCode = (int)HttpStatusCode.Conflict
            }
            : new OkObjectResult(guest);
    }

    [FunctionName("CreateGuest")]
    public async Task<IActionResult> CreateGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "guest")]
        HttpRequest req)
    {
        var validatedRequest = await HttpRequestHelpers.ValidateRequest<Guest, CreateGuestValidator>(req);
        if (!validatedRequest.IsValid) return validatedRequest.ToBadRequest();

        var guest = validatedRequest.Value;

        guest.Id = ObjectId.GenerateNewId();
        guest = guest.RoomId == ObjectId.Empty
            ? await _roomService.AssignGuestToNewRoom(guest)
            : await _roomService.AssignGuestToExistingRoom(guest);

        await _guestService.AddOneAsync(guest);

        var createdGuest = await _guestService.FindOneByIdAsync(guest.Id);
        if (createdGuest.Id == ObjectId.Empty) return new InternalServerErrorResult();
        return new CreatedResult($"guest/{guest.Id}", createdGuest);
    }

    [FunctionName("DeleteGuest")]
    public async Task<IActionResult> DeleteGuest(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "guest/{id}")]
        HttpRequest req, string id)
    {
        var guest = await _guestService.FindOneByIdAsync(ObjectId.Parse(id));

        await _guestService.DeleteByIdAsync(guest.Id);
        await _roomService.RemoveGuestFromRoom(guest.RoomId, guest.Id);

        return new OkResult();
    }
}