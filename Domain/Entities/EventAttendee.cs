using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity responsible for keeping track of attendees for specific events.
    /// </summary>
    [Serializable]
    public class EventAttendee : BaseEntity
    {
        public Guid AttendeeId { get; set; }
        public Guid EventId { get; set; }
        public bool IsHost { get; set; }

        public virtual User? Attendee { get; set; }
        public virtual Event? Event { get; set; }
    }
}
