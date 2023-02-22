using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the groups created.
    /// </summary>
    public class Group : BaseAuditableEntity
    {
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<UserGroup> GroupedUsers { get; set; } = new HashSet<UserGroup>();
    }
}
