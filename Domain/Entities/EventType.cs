using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the types available for an event.
    /// </summary>
    public class EventType : BaseAuditableEntity
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }
        public Guid CreatorId { get; set; }

        public virtual ICollection<Event> TypedEvents { get; set; } = new HashSet<Event>();
    }
}
