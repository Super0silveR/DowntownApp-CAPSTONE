using System.Security.Claims;

namespace Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        string? GetUserId();
        string? GetUserName();
        IEnumerable<Claim>? GetUserClaims();
    }
}
