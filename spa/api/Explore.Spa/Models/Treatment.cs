using System;

namespace Explore.Spa.Models;

public abstract class Treatment
{
    public string Name { get; init; } = string.Empty;
    public string Destription { get; init; } = string.Empty;
    public string Place { get; init; } = string.Empty;
}