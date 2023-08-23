using System;

namespace Explore.Spa.Models;

public class MudBath : Treatment
{
    public bool MudMask { get; set; } = false;
    public bool FullBody { get; set; } = false;
}