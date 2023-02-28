using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Api.Requirements.Handlers
{
    public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       HasScopeRequirement requirement)
        {
            if (!context.User.HasClaim(claim => claim.Type == "scope" && claim.Issuer == requirement.Issuer))
                return Task.CompletedTask;

            var scopes = context.User
                                .FindAll(claim => claim.Type == "scope" && claim.Issuer == requirement.Issuer)!;

            if (scopes.Any(scope => scope.Value == requirement.Scope))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}
