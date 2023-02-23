using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Join Entity that represents the `followers/followings` relationship.
    /// </summary>
    public class UserFollowing : BaseEntity
    {
        public Guid ObserverId { get; set; }
        public Guid TargetId { get; set; }
        public DateTime Followed { get; set; }
        public bool IsFavourite { get; set; } = false;

        public virtual User? Observer { get; set; }
        public virtual User? Target { get; set; }
    }
}
