namespace Application.Common.Interfaces
{
    internal interface IEventService
    {
        string? GetEventId();
        string? GetEventName();
        string? GetEventAuthorName();
    }
}
