using Policies = Api.Constants.AuthorizationPolicyConstants;
using Api.Requirements;
using Api.Requirements.Handlers;
using Api.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Application.Common.Interfaces;

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
                    .AddRoles<Role>()
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
                            ValidateIssuer = true,
                            ValidateIssuerSigningKey = true
                        };

                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                var accessToken = context.Request.Query["access_token"];
                                var path = context.HttpContext.Request.Path;

                                if (!string.IsNullOrEmpty(accessToken) &&
                                    path.StartsWithSegments("/hubs/chats"))
                                    context.Token = accessToken;

                                return Task.CompletedTask;
                            }
                        };
                    });

            services.AddAuthorization(options =>
            {
                /// Policies oriented autorization.
                options.AddPolicy(Policies.READ_EVENTS, policy => policy.Requirements.Add(new HasScopeRequirement(auth0Autority, Policies.READ_EVENTS)));
            });

            services.AddScoped<ITokenService, TokenService>();
            services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

            return services;
        }
    }
}
