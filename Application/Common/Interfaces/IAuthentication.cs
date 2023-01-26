using Application.Commands.User;
using Application.Responses;

namespace Application.Common.Interfaces
{
    public interface IAuthentication
    {
        Task<AuthenticationResponse> LoginAsync(LoginCommand user);
        Task<AuthenticationResponse> RegisterAsync(CreateUserCommand user);
    }
}
