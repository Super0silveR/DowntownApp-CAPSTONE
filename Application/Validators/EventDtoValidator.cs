using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// EventDto Validation Class.
    /// </summary>
    public class EventCommandDtoValidator : AbstractValidator<EventCommandDto>
    {
        public EventCommandDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description)
                .MaximumLength(255)
                .NotEmpty();
        }

    }
}
