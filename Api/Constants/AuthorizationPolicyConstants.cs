namespace Api.Constants
{
    /// <summary>
    /// Static constants class for policies-oriented authorization.
    /// Auth0 is used right now for permissions as a trusted JWKS Endpoint.
    /// https://auth0.com/docs/quickstart/backend/aspnet-core-webapi/01-authorization
    /// </summary>
    public static class AuthorizationPolicyConstants
    {
        public const string READ_EVENTS = "read:events";
        public const string WRITE_EVENTS = "write:events";
    }
}
