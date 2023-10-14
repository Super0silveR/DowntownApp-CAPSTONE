using Application.DTOs.Commands;
using FluentValidation;

namespace Application.Validators
{
    /// <summary>
    /// Abstract validator for the command DTO for updating user profile general information.
    /// </summary>
    public class ProfileCommandDtoValidator : AbstractValidator<ProfileCommandDto>
    {
        public ProfileCommandDtoValidator()
        {
            RuleFor(pcdto => pcdto.DisplayName)
                .NotEmpty()
                .MinimumLength(6);

            RuleFor(pcdto => pcdto.Bio)
                .MinimumLength(50)
                .MaximumLength(255);
        }
    }
}
