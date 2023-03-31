using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventRateDto Validation Class.
    /// </summary>
    public class EventRateCommandDtoValidator : AbstractValidator<EventRateCommandDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public EventRateCommandDtoValidator()
        {
           RuleFor(ec => ec.Rating)
                .InclusiveBetween(1, 5)
                .WithMessage("The rating must be an integer from 1 to 5 out of 5");

        }
    }
}
