using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the association of a scheduled event at a bar.
    /// </summary>
    public class ScheduledEvent : BaseAuditableEntity
    {
        public Guid BarId { get; set; }
        public Guid EventId { get; set; }
        public DateTime Scheduled { get; set; }
        public bool IsHost { get; set; }
        public int Capacity { get; set; }
        public string? Guidelines { get; set; } // This is potentially a JSON document.

        public virtual Bar? Bar { get; set; } 
        public virtual Event? Event { get; set; }

        public virtual ICollection<EventChallenge> Challenges { get; set; } = new HashSet<EventChallenge>();
        public virtual ICollection<EventComment> Comments { get; set; } = new HashSet<EventComment>();
        public virtual ICollection<EventAttendee> Attendees { get; set; } = new HashSet<EventAttendee>();
        public virtual ICollection<EventTicket> Tickets { get; set; } = new HashSet<EventTicket>();
    }
}
