using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    public class BarCommandDtoValidator : AbstractValidator<BarCommandDto>
    {
        public BarCommandDtoValidator()
        {
            RuleFor(bdto => bdto.Title)
                .MaximumLength(50)
                .MinimumLength(5)
                .NotEmpty();

            RuleFor(bdto => bdto.Description)
                .MaximumLength(255)
                .NotEmpty();

            RuleFor(bdto => bdto.CoverCost);
        }
    }
}
