using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventCategoryDto Validation Class.
    /// </summary>
    public class EventCategoryCommandDtoValidator : AbstractValidator<EventCategoryCommandDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public EventCategoryCommandDtoValidator()
        {
            RuleFor(ec => ec.Title)
                .MaximumLength(25)
                .MinimumLength(5)
                .NotEmpty()
                .WithMessage("The category title is required and must be between 5 and 25 caracters.");

            RuleFor(ec => ec.Description)
                .MaximumLength(255)
                .NotEmpty()
                .WithMessage("The category description is required and is at most 255 caracters.");

            RuleFor(ec => ec.Color)
                .NotEmpty()
                .WithMessage("The color is required.");
        }
    }
}
