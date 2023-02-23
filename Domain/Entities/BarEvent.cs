using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the association of a scheduled event at a bar.
    /// </summary>
    public class BarEvent : BaseAuditableEntity
    {
        public Guid BarId { get; set; }
        public Guid EventId { get; set; }
        public DateTime Scheduled { get; set; }
        public bool IsHost { get; set; }
        public int Capacity { get; set; }
        public string? Guidelines { get; set; } // This is potentially a JSON document.

        public virtual Bar? Bar { get; set; } 
        public virtual Event? Event { get; set; }

        public virtual ICollection<BarEventChallenge> Challenges { get; set; } = new HashSet<BarEventChallenge>();
        public virtual ICollection<BarEventComment> Comments { get; set; } = new HashSet<BarEventComment>();
        public virtual ICollection<BarEventAttendee> Attendees { get; set; } = new HashSet<BarEventAttendee>();
    }
}
