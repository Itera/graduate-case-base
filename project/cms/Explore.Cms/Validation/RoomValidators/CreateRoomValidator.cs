using FluentValidation;
using MongoDB.Bson;

namespace Explore.Cms.Validation.RoomValidators;

public class CreateRoomValidator : RoomValidator
{
    public CreateRoomValidator()
    {
        RuleFor(r => r.Id).Equal(ObjectId.Empty).WithMessage("Room cannot have an id");
        RuleFor(r => r.RoomNumber).Equal(-1).WithMessage("Room cannot have a room number");
    }
}