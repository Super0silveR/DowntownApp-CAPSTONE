using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents a comment for a specific event at a specific bar.
    /// </summary>
    public class EventComment : BaseEntity
    {
        public Guid EventId { get; set; }
        public Guid AttendeeId { get; set; }
        public string? Comment { get; set; }
        public DateTime Sent { get; set; }

        public virtual EventAttendee? EventAttendee { get; set; }
        public virtual ScheduledEvent? Event { get; set; }
        public virtual User? Attendee { get; set; }
    }
}
