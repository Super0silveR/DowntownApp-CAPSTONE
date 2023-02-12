using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Event entity.
    /// </summary>
    public class Event : EntityBase
    {
        public string? Title { get; set; }
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? City { get; set; }
        public string? Venue { get; set; }

        public virtual ICollection<EventAttendee>? Attendees { get; set; }
    }
}
