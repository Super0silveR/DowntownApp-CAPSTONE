using AppException = Application.Common.Exceptions.ApplicationException;
using System.Net;
using System.Text.Json;
using Application.Common.Exceptions;

namespace Api.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(IHostEnvironment env,  
                                   ILogger<ExceptionMiddleware> logger,
                                   RequestDelegate next)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                _logger.LogError(ex, ex.Message, ex.Errors);

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode,
                                       ex.Message,
                                       ex.StackTrace?.ToString(),
                                       ex.Errors)
                    : new AppException(context.Response.StatusCode,
                                       "Internal Server Error");

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode,
                                       ex.Message,
                                       ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode,
                                       "Internal Server Error");

                var options = new JsonSerializerOptions 
                { 
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase 
                };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}
