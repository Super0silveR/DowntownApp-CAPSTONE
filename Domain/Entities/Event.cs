using Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    /// <summary>
    /// Event entity.
    /// </summary>
    public class Event : BaseAuditableEntity
    {
        public Guid CreatorId { get; set; }
        public Guid EventCategoryId { get; set; }
        public Guid EventTypeId { get; set; }
        public Guid BarId { get; set; }
        public string? Title { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;

        public virtual User? Creator { get; set; }
        public virtual EventCategory? Category { get; set; }
        public virtual EventType? EventType { get; set; }

        public virtual ICollection<EventContributor> Contributors { get; set; } = new HashSet<EventContributor>();
        public virtual ICollection<EventRating> Ratings { get; set; } = new HashSet<EventRating>();
        public virtual ICollection<BarEvent> ScheduledBarEvents { get; set; } = new HashSet<BarEvent>();
    }
}
