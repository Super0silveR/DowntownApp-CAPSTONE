using Domain.Common;
using Domain.Entities;

namespace Domain.Events.Events
{
    /// <summary>
    /// Event class representing the `delete event` action.
    /// </summary>
    public class DeletedEvent : BaseEvent
    {
        public DeletedEvent(Event @event)
        {
            Event = @event;
        }

        public Event Event { get; }
    }
}
