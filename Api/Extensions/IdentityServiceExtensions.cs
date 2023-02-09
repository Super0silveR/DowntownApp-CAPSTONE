using Api.Requirements;
using Api.Requirements.Handlers;
using Api.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Security.Claims;
using System.Text;

namespace Api.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
                                                             IConfiguration configuration)
        {
            var auth0Autority = configuration["Accounts:Auth0:Authority"];
            var auth0Audience = configuration["Accounts:Auth0:Audience"];

            var securityKey = configuration["Jwt:Secret"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));

            services.AddIdentityCore<User>(opt =>
                    {
                        opt.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);

                        opt.Password.RequireDigit = true;
                        opt.Password.RequiredLength = 8;
                        opt.Password.RequireLowercase = true;
                        opt.Password.RequireNonAlphanumeric = false;
                        opt.Password.RequiredUniqueChars = 3;
                        opt.Password.RequireUppercase = true;

                        opt.Stores.MaxLengthForKeys = 128;

                        opt.User.RequireUniqueEmail = true;
                    })
                    .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.Audience = auth0Audience;
                        options.Authority = auth0Autority;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            IssuerSigningKey = key,
                            ValidateAudience = true,
                            ValidateIssuer = false,
                            ValidateIssuerSigningKey = true
                        };
                    });

            services.AddAuthorizationCore(options =>
            {
                options.AddPolicy("read:events", policy => policy.Requirements.Add(new HasScopeRequirement(auth0Autority, "read:events")));
            });

            services.AddScoped<TokenService>();
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            return services;
        }
    }
}
