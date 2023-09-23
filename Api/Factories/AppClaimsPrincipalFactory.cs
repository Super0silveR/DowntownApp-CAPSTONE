using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using Policies = Api.Constants.AuthorizationPolicyConstants;

namespace Api.Factories
{
    public class AppClaimsPrincipalFactory : UserClaimsPrincipalFactory<User>
    {
        private readonly UserManager<User> _userManager;

        public AppClaimsPrincipalFactory(UserManager<User> userManager, IOptions<IdentityOptions> optionsAccessor) : 
            base(userManager, optionsAccessor)
        {
            _userManager = userManager;
        }

        /// <summary>
        /// Method that generates the claim for all users.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(User user)
        {
            ClaimsIdentity claims = await base.GenerateClaimsAsync(user);
            bool isAdmin = await _userManager.IsInRoleAsync(user, Policies.ADMIN);

            if (isAdmin)
                claims.AddClaim(new Claim("scope", Policies.ADMIN));

            if (user.IsContentCreator || isAdmin)
                claims.AddClaim(new Claim("scope", Policies.CREATOR));

            if (user.EmailConfirmed || user.IsContentCreator || isAdmin)
            {
                claims.AddClaim(new Claim("scope", Policies.WRITE_BARS));
                claims.AddClaim(new Claim("scope", Policies.WRITE_EVENTS));
            }

            claims.AddClaim(new Claim("scope", Policies.READ_BARS));
            claims.AddClaim(new Claim("scope", Policies.READ_EVENTS));

            return claims;
        }
    }
}
