using Application.Common.Behaviors;
using Application.Core;
using Application.Handlers.Events;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
            services.AddDbContext<DataContext>(opt =>
            {
                //var constr = configuration["ConnectionStrings:DefaultConnection"];
                //opt.UseSqlite(constr);

                //TODO: PgSql connection.
                var constr = configuration["ConnectionStrings:PgAdminConnection"];
                //var constr = configuration["ConnectionStrings:PgAdminConnection"];
                opt.UseNpgsql(constr);
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
                        .WithOrigins("http://localhost:3000");
                    });
            });

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddMediatR(typeof(Details.Handler).Assembly);
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            // Adding AWS configuration
            var AWSoptions = configuration.GetAWSOptions();

            services.AddDefaultAWSOptions(AWSoptions);
            //services.AddAWSService<IAmazonS3>(); /// S3 Bucket for file/bucket actions.

            return services;
        }
    }
}
