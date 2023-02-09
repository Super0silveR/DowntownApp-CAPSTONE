using Api.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

namespace Api.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
                                                             IConfiguration configuration)
        {
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
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuerSigningKey = true,
                            IssuerSigningKey = key,
                            ValidateIssuer = false,
                            ValidateAudience = false
                        };
                    });

            services.AddScoped<TokenService>();

            return services;
        }
    }
}
