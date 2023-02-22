using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the categories available for an event.
    /// </summary>
    public class EventCategory : BaseAuditableEntity
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }

        public virtual ICollection<Event> CategorizedEvents { get; set; } = new HashSet<Event>();
    }
}
