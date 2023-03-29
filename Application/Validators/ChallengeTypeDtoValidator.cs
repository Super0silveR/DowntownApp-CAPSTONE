using Application.DTOs;
using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// ChallengeTypeDto Validation Class.
    /// </summary>
    public class ChallengeTypeCommandDtoValidator : AbstractValidator<ChallengeTypeCommandDto>
    {
        /// <summary>
        /// Constructor initialize the validation rules.
        /// </summary>
        public ChallengeTypeCommandDtoValidator()
        {
            RuleFor(ec => ec.Name)
                .MaximumLength(25)
                .MinimumLength(5)
                .NotEmpty()
                .WithMessage("The ChallengeType Name is required and must be between 5 and 25 caracters.");

            RuleFor(ec => ec.Description)
                .MaximumLength(255)
                .NotEmpty()
                .WithMessage("The ChallengeType Description is required and is at most 255 caracters.");
        }
    }
}
