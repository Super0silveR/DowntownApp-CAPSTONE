using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents what user belongs to what group.
    /// </summary>
    public class UserGroup : BaseAuditableEntity
    {
        public Guid GroupId { get; set; }
        public Guid UserId { get; set; }

        public virtual Group? Group { get; set; }
        public virtual User? User { get; set; }
    }
}
