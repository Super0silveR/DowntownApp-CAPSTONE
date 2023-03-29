using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventTypeDto Validation Class.
    /// </summary>
    public class EventTypeCommandDtoValidator : AbstractValidator<EventTypeCommandDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public EventTypeCommandDtoValidator()
        {
            RuleFor(ec => ec.Title)
                .MaximumLength(25)
                .MinimumLength(5)
                .NotEmpty()
                .WithMessage("The type title is required and must be between 5 and 25 caracters.");

            RuleFor(ec => ec.Description)
                .MaximumLength(255)
                .NotEmpty()
                .WithMessage("The type description is required and is at most 255 caracters.");

            RuleFor(ec => ec.Color)
                .NotEmpty()
                .WithMessage("The color is required.");
        }
    }
}
