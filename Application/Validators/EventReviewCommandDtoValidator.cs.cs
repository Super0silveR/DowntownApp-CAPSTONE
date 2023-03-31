using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventReviewDto Validation Class.
    /// </summary>
    public class EventReviewCommandDtoValidator : AbstractValidator<EventReviewCommandDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public EventReviewCommandDtoValidator()
        {
            RuleFor(ec => ec.Review)
                .MaximumLength(255)
                .NotEmpty()
                .WithMessage("The review is required and is at most 255 caracters.");

        }
    }
}
