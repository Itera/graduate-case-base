using System;

namespace Explore.Spa.Models;

public class Massage : Treatment
{
    public bool FullBody { get; set; } = false;
    public bool Spot { get; set; } = false;
}