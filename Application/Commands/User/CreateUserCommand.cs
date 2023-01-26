using Application.Responses;
using MediatR;

namespace Application.Commands.User
{
    public class CreateUserCommand : IRequest<AuthenticationResponse>
    {
        public string? UserId { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
    }
}
