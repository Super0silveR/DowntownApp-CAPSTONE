using Domain.Common;
using Domain.Entities;

namespace Domain.Events.Events
{
    /// <summary>
    /// Event class representing the `edit event` action.
    /// </summary>
    public class EditedEvent : BaseEvent
    {
        public EditedEvent(Event @event)
        {
            Event = @event;
        }

        public Event Event { get; }
    }
}
