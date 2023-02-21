using Domain.Common;
using Domain.Entities;

namespace Domain.Events.Events
{
    /// <summary>
    /// Event class representing the `create event` action.
    /// </summary>
    public class CreatedEvent : BaseEvent
    {
        public CreatedEvent(Event @event)
        {
            Event = @event;
        }

        public Event Event { get; }
    }
}
