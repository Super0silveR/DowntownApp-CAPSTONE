using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represent a `bar` created and managed by a user.
    /// </summary>
    public class Bar : BaseAuditableEntity
    {
        public Guid CreatorId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public double CoverCost { get; set; } = 0.0;
        public bool IsActive { get; set; } = false;

        public virtual User? Creator { get; set; }

        public virtual ICollection<BarEvent> ScheduledEvents { get; set; } = new HashSet<BarEvent>();
        public virtual ICollection<BarLike> Likes { get; set; } = new HashSet<BarLike>();
    }
}
