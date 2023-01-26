using Application.Responses;
using MediatR;

namespace Application.Commands.User
{
    public class LoginCommand : IRequest<AuthenticationResponse>
    {
        public string? UserId { get; set; }
        public string? Password { get; set; }
    }
}
