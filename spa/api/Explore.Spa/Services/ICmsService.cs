using System;
using System.Threading.Tasks;
using Explore.Spa.Models;

namespace Explore.Spa.Services;

public interface ICmsService
{
    Task<string> HealthCheckAsync();
    Task<GuestResponse> CreateGuestAsync(CreateGuestRequest guest);
    Task<GuestResponse> GetGuestByIdAsync(Guid userId);
    Task<RoomResponse> GetRoomByIdAsync(Guid userId);
}
