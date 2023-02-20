using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Event entity.
    /// </summary>
    public class Event : BaseAuditableEntity
    {
        public string? Title { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string? City { get; set; }
        public string? Venue { get; set; }

        public ICollection<EventAttendee> Attendees { get; set; } = new List<EventAttendee>();
    }
}
