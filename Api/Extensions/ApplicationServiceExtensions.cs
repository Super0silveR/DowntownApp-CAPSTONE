using Application.Common.Behaviors;
using Application.Core;
using Application.Handlers.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
                                                                IConfiguration config)
        {
            // Configure the HTTP request pipeline.
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                var constr = config.GetConnectionString("DefaultConnection");
                opt.UseSqlite(constr);
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
            services.AddMediatR(typeof(Details.Handler).Assembly);
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            // Adding AWS configuration
            var AWSoptions = config.GetAWSOptions();

            services.AddDefaultAWSOptions(AWSoptions);
            //services.AddAWSService<IAmazonS3>(); /// S3 Bucket for file/bucket actions.

            return services;
        }
    }
}
