using Application.Common.Behaviors;
using Application.Common.Interfaces;
using Application.Core;
using Application.Handlers.Events.Commands;
using Application.Handlers.Events.Queries;
using Application.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.Processors.Security;
using Persistence;
using Persistence.Interceptors;
using Persistence.Services;
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

            // Interceptors.
            services.AddScoped<AuditableEntitySaveChangesInterceptor>();
            services.AddScoped<UserFollowingSaveChangesInterceptor>();

            services.AddDbContext<DataContext>(opt =>
            {
                //var constr = configuration["ConnectionStrings:DefaultConnection"];
                //opt.UseSqlite(constr,
                //              builder => builder.MigrationsAssembly(typeof(DataContext).Assembly.FullName));

                //TODO: PgSql connection. (Prod vs Env)
                var constr = configuration["ConnectionStrings:PgAdminConnection"];
                opt.UseNpgsql(constr,
                    builder => builder.MigrationsAssembly(typeof(DataContext).Assembly.FullName));
            });

            services.AddSingleton<ICurrentUserService, CurrentUserService>();

            services.AddHttpContextAccessor();

            services.AddScoped<IDataContext>(provider => provider.GetRequiredService<DataContext>());

            services.AddScoped<DataContextInitializer>();

            services.AddTransient<IColorService, ColorService>();
            services.AddTransient<IDateTimeService, DateTimeService>();

            services.Configure<ApiBehaviorOptions>(options =>
                options.SuppressModelStateInvalidFilter = true);

            services.AddSignalR(options =>
            {
                options.EnableDetailedErrors = true;
            });

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
                        .WithOrigins("https://localhost:3000");
                    });
            });

            services.AddMediatR(typeof(Details.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            //services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }
    }
}
