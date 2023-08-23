using System;

namespace Explore.Spa.Models;

public class Booking
{
    public Treatment TreatmentName { get; init; }
    public int RoomNumber { get; init; } = 0;
    public DateTime StartDateTime { get; set; } = DateTime.UtcNow;
    public DateTime EndDateTime { get; set; } = DateTime.UtcNow;
}