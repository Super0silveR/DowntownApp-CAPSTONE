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
        public int Vote { get; set; }

        public virtual Event? Event { get; set; }
        public virtual User? User { get; set; }
    }
}
