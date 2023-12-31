using Explore.Cms.Models;
using FluentValidation;

namespace Explore.Cms.Validation.GuestValidators;

public class CreateGuestValidator : AbstractValidator<Guest>
{
    public CreateGuestValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().WithMessage("A guest must have a first name");
        RuleFor(x => x.LastName).NotEmpty().WithMessage("A guest must have a last name");
        RuleFor(x => x.Id).NotEqual(Guid.Empty).WithMessage("A guest must have an id");
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("A guest must have an email")
            .EmailAddress()
            .WithMessage("Email is invalid");
    }
}