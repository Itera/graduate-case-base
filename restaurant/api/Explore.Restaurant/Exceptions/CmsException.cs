using System;

namespace Explore.Restaurant.Exceptions;

public class CmsException : Exception
{
    public CmsException(string message = "") : base(message)
    {
    }
}