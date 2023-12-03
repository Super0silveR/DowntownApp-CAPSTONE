using Application.Common.Behaviors;
using Application.Common.Interfaces;
using Application.Core;
using Application.Handlers.Events.Commands;
using Application.Handlers.Events.Queries;
using Application.Services;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Medias;
using Infrastructure.Medias.Cloudinary;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.Processors.Security;
using Persistence;
using Persistence.Interceptors;
using Persistence.Services;
using System.Reflection;
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
                configure.Title = "Downtown-App API";
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

            // HttpClient
            services.AddHttpClient();

            // Data Context.
            services.AddDbContext<DataContext>(opt =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either FlyIO
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = configuration["ConnectionStrings:PgAdminConnection"];
                }
                else
                {
                    // Use connection string provided at runtime by FlyIO.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl!.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];
                    var updatedHost = pgHost.Replace("flycast", "internal");

                    connStr = $"Server={updatedHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
                }

                opt.UseNpgsql(connStr,
                    builder =>
                    {
                        builder.MigrationsAssembly(typeof(DataContext).Assembly.FullName);
                        /// Using the `SplitQuery` behavior is to work around performance issues with JOINs. 
                        /// EF allows to specify that a given LINQ query should be split into multiple SQL queries.
                        builder.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
                    });
            });

            services.AddSingleton<ICurrentUserService, CurrentUserService>();

            services.AddHttpContextAccessor();

            services.AddScoped<IDataContext>(provider => provider.GetRequiredService<DataContext>());
            services.AddScoped<DataContextInitializer>();
            services.AddScoped<IMediaService, MediaService>();

            services.AddTransient<IColorService, ColorService>();
            services.AddTransient<IDateTimeService, DateTimeService>();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

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
                        .AllowCredentials()
                        .WithOrigins("https://localhost:3000", "http://localhost:3000");
                    });
            });

            services.AddMediatR(cfg=>cfg.RegisterServicesFromAssemblies(typeof(Details.Handler).GetTypeInfo().Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));

            return services;
        }
    }
}
