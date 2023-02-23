using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity responsible for keeping track of attendees for specific events.
    /// </summary>
    public class BarEventAttendee : BaseEntity
    {
        public Guid AttendeeId { get; set; }
        public Guid BarEventId { get; set; }
        public bool IsHost { get; set; }

        public virtual User? Attendee { get; set; }
        public virtual BarEvent? BarEvent { get; set; }

        public virtual ICollection<BarEventComment> BarEventComments { get; set; } = new HashSet<BarEventComment>();
    }
}
