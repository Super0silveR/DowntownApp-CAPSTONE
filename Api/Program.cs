using Api.Extensions;
using Api.Middlewares;
using Api.SignalR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager _config = builder.Configuration;

// Add services to the container.
builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddApplicationServices(_config);
builder.Services.AddIdentityServices(_config);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi3();
}

app.UseCors("AllowSpecificOrigins");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Using our minified/bundled client application that is located in wwwroot.
// Our Kestrel Server that run the Api (i.e. Backend) will also host the client.
app.UseDefaultFiles();
app.UseStaticFiles();

// Controllers and endpoints mapping.
app.MapControllers();
app.MapHub<ChatHub>("/hubs/chats");
app.MapFallbackToController("Index", "Fallback");

#region Context and Seed Data

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var initializer = services.GetRequiredService<DataContextInitializer>();

    await initializer.InitializeAsync();
    await initializer.SeedAsync();
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
}

#endregion

app.Run();
