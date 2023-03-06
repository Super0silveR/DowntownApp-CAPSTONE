using Application.DTOs;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventTypeDto Validation Class.
    /// </summary>
    public class EventTypeDtoValidator : AbstractValidator<EventTypeDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public EventTypeDtoValidator()
        {
            RuleFor(ec => ec.CreatorId);

            RuleFor(ec => ec.Title)
                .MaximumLength(25)
                .MinimumLength(5)
                .NotEmpty()
                .WithMessage("The type title is required and must be between 5 and 25 caracters.");

            RuleFor(ec => ec.Color)
                .NotEmpty()
                .WithMessage("The color is required.");
        }
    }
}
