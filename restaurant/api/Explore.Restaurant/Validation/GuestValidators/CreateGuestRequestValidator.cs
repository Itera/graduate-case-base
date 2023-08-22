using Explore.Restaurant.Models;
using FluentValidation;

namespace Explore.Restaurant.Validation.GuestValidators;

public class CreateGuestRequestValidator : AbstractValidator<CreateGuestRequest>
{
    public CreateGuestRequestValidator()
    {
        RuleFor(guest => guest.FirstName)
            .NotEmpty()
            .WithMessage("First name is required.");
        
        RuleFor(guest => guest.LastName)
            .NotEmpty()
            .WithMessage("Last name is required.");
        
        RuleFor(guest => guest.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Email is invalid.");
    }
}