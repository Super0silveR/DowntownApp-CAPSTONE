using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface ITokenService
    {
        public Task<string> CreateToken(User user);
    }
}
