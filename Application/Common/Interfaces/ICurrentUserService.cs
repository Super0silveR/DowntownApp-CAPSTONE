namespace Application.Common.Interfaces
{
    public interface ICurrentUserService
    {
        string? GetUserId();
        string? GetUserName();
    }
}
