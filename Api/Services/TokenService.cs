using Policies = Api.Constants.AuthorizationPolicyConstants;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services
{
    /// <summary>
    /// JWT Token-related actions service.
    /// </summary>
    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateToken(User user)
        {
            var auth0Autority = _configuration["Accounts:Auth0:Authority"];
            var auth0Audience = _configuration["Accounts:Auth0:Audience"];

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            /// We'll definetely need to had some more logic to scope assignement. AND change this IF.
            if (user is not null) 
                claims.Add(new Claim("scope", Policies.READ_EVENTS));

            var securityKey = _configuration["Jwt:Secret"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
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
