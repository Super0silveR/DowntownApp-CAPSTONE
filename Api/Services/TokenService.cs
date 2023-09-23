using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Common.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Api.Services
{
    /// <summary>
    /// JWT Token-related actions service.
    /// </summary>
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly ICurrentUserService _userService;
        private readonly IUserClaimsPrincipalFactory<User> _claimsPrincipalFactory;

        public TokenService(IConfiguration configuration,
                            ICurrentUserService userService,
                            IUserClaimsPrincipalFactory<User> claimsPrincipalFactory)
        {
            _configuration = configuration;
            _userService = userService;
            _claimsPrincipalFactory = claimsPrincipalFactory;
        }

        public async Task<string> CreateToken(User user)
        {
            var auth0Autority = _configuration["Accounts:Auth0:Authority"];
            var auth0Audience = _configuration["Accounts:Auth0:Audience"];

            var claims = await _claimsPrincipalFactory.CreateAsync(user);

            var securityKey = _configuration["Jwt:Secret"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims.Claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds,
                Issuer = auth0Autority,
                Audience = auth0Audience,
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}
