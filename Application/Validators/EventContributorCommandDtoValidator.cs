using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventCategoryDto Validation Class.
    /// </summary>
    public class EventContributorCommandDtoValidator : AbstractValidator<EventContributorCommandDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public EventContributorCommandDtoValidator()
        {
            RuleFor(ec => ec.EventId)
                .NotEmpty().WithMessage("Event Id is required.");

            RuleFor(ec => ec.UserId)
                .NotEmpty().WithMessage("User Id is required.");

            RuleFor(ec => ec.IsActive)
                .NotNull().WithMessage("IsActive is required.");

            RuleFor(ec => ec.IsAdmin)
                .NotNull().WithMessage("IsAdmin is required.");

            RuleFor(ec => ec.Status)
                .IsInEnum().WithMessage("Invalid contributor status.");

        }
    }
}
