using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security
{
    /// <summary>
    /// Service allowing the application to access the current user accessing the API.
    /// </summary>
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Fetching the current user's id from the http context.
        /// </summary>
        public string? GetUserId() => 
            _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

        /// <summary>
        /// Fetching the current user's username from the http context.
        /// </summary>
        public string? GetUserName() => 
            _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Name);
    }
}
