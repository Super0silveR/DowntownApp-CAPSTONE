using Api.Installers.Interfaces;
using Application.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Api.Installers.Implementations
{
    public class JwtInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = new JwtSettings();

            configuration.Bind(nameof(jwtSettings), jwtSettings);

            services.AddSingleton(jwtSettings);

            var tokenValidationParams = new TokenValidationParameters
            {
                ValidateIssuer = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret!)),
                ValidateAudience = true,
                ValidateLifetime = true,
                RequireExpirationTime = false
            };

            services.AddSingleton(tokenValidationParams);

            services
                .AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.SaveToken = true;
                    x.TokenValidationParameters = tokenValidationParams;
                });
        }
    }
}
