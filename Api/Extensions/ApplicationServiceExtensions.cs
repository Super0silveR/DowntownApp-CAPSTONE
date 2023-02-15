using Api.Services;
using Application.Common.Behaviors;
using Application.Common.Interfaces;
using Application.Core;
using Application.Handlers.Events.Commands;
using Application.Handlers.Events.Queries;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using NSwag;
using NSwag.Generation.Processors.Security;
using Persistence;
using OpenApiSecurityScheme = NSwag.OpenApiSecurityScheme;

namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
                                                                IConfiguration configuration)
        {
            // Configure the HTTP request pipeline.
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "CleanArchitecture API";
                configure.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Name = "Authorization",
                    In = OpenApiSecurityApiKeyLocation.Header,
                    Description = "Type into the textbox: Bearer {your JWT token}."
                });

                configure.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));
            });

            services.AddDbContext<DataContext>(opt =>
            {
                var constr = configuration["ConnectionStrings:DefaultConnection"];
                opt.UseSqlite(constr, 
                              builder => builder.MigrationsAssembly(typeof(DataContext).Assembly.FullName));

                //TODO: PgSql connection. (Prod vs Env)
                //var constr = configuration["ConnectionStrings:PgAdminConnection"];
                //opt.UseNpgsql(constr);
            });

            services.AddSingleton<ICurrentUserService, CurrentUserService>();

            services.AddHttpContextAccessor();

            services.AddScoped<IDataContext>(provider => provider.GetRequiredService<DataContext>());

            services.Configure<ApiBehaviorOptions>(options =>
                options.SuppressModelStateInvalidFilter = true);

            // Cors
            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: "AllowSpecificOrigins",
                    builder =>
                    {
                        builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000");
                    });
            });

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddMediatR(typeof(Details.Handler).Assembly);
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }
    }
}
