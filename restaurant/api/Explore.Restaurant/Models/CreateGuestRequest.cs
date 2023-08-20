using System;

namespace Explore.Restaurant.Models;

public class CreateGuestRequest
{
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Guid Id { get; set; }
}