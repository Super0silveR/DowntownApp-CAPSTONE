using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity responsible for keeping track of attendees for specific events.
    /// </summary>
    public class EventAttendee : BaseEntity
    {
        public Guid AttendeeId { get; set; }
        public Guid ScheduledEventId { get; set; }
        public Guid? TicketId { get; set; }
        public bool IsHost { get; set; }

        public virtual User? Attendee { get; set; }
        public virtual ScheduledEvent? Event { get; set; }
        public virtual EventTicket? Ticket { get; set; }

        public virtual ICollection<EventComment> EventComments { get; set; } = new HashSet<EventComment>();
    }
}
