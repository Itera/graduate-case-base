using System;

namespace Explore.Spa.Models;

public class Booking
{
    public Treatment TreatmentName { get; init; } = string.Empty;
    public GuestResponse GuestName { get; init} = GuestResponse.Empty;
    public DateTime StartDateTime { get; set; } = DateTime.UtcNow;
    public DateTime EndDateTime { get; set; } = DateTime.UtcNow;
}