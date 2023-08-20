using System;

namespace Explore.Spa.Exceptions;

public class CmsException : Exception
{
    public CmsException(string message = "") : base(message)
    {
    }
}