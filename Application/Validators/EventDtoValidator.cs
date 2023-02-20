using Application.DTOs;
using Domain.Entities;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Event Validation Class.
    /// </summary>
    public class EventDtoValidator : AbstractValidator<EventDto>
    {
        public EventDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description)
                .MaximumLength(255)
                .NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }

    }
}
