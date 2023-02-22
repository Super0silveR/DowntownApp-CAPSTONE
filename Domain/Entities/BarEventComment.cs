using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents a comment for a specific event at a specific bar.
    /// </summary>
    public class BarEventComment : BaseEntity
    {
        public Guid BarEventId { get; set; }
        public Guid AttendeeId { get; set; }
        public string? Comment { get; set; }
        public DateTime Sent { get; set; }

        public virtual BarEventAttendee? BarEventAttendee { get; set; }
        public virtual BarEvent? BarEvent { get; set; }
        public virtual User? Attendee { get; set; }
    }
}
