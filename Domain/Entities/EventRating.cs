using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the overall rating for a specific event.
    /// </summary>
    public class EventRating : BaseEntity
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public DateTime Rated { get; set; } = DateTime.UtcNow;
        public int Vote { get; set; }
        public string? Review { get; set; }

        public virtual Event? Event { get; set; }
        public virtual User? User { get; set; }
    }
}
