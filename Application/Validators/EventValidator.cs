using Domain.Entities;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Event Validation Class.
    /// </summary>
    public class EventValidator : AbstractValidator<Event>
    {
        public EventValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description)
                .MaximumLength(255)
                .NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }

    }
}
