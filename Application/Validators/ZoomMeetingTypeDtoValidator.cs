using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Validator for ZoomMeetingTypeCommandDto.
    /// </summary>
    public class ZoomMeetingTypeDtoValidator : AbstractValidator<ZoomMeetingTypeCommandDto>
    {
        public ZoomMeetingTypeDtoValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(50).WithMessage("Name must be at most 50 characters long.");

            RuleFor(x => x.Description)
                .NotEmpty().WithMessage("Description is required.")
                .MaximumLength(255).WithMessage("Description must be at most 255 characters long.");

            RuleFor(x => x.StartTime)
                .NotEmpty().WithMessage("Start time is required.");

            RuleFor(x => x.EndTime)
                .NotEmpty().WithMessage("End time is required.")
                .GreaterThan(x => x.StartTime).WithMessage("End time must be after start time.");

            RuleFor(x => x.TimeZone)
                .NotEmpty().WithMessage("Time zone is required.");
        }
    }
}
