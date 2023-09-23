using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Authorization;

namespace Api.Requirements
{
    public class HasScopeRequirement : IAuthorizationRequirement
    {
        public string? Issuer { get; }
        public string? Scope { get; }

        public HasScopeRequirement(string issuer, string scope)
        {
            Guard.Against.Null(issuer, nameof(issuer));
            Guard.Against.Null(scope, nameof(scope));

            Issuer = issuer;
            Scope = scope;
        }
    }
}
