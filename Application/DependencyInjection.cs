using Application.Common.Behaviors;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using FluentValidation;
using System.Reflection;

namespace Application
{
    /// <summary>
    /// Class summarizing the dependency injection necessary for the various services in `Application`.
    /// </summary>
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // Application related services.
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            return services;
        }
    }
}
