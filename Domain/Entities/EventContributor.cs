using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the different contributors for a specific event.
    /// </summary>
    public class EventContributor : BaseAuditableEntity
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public ContributorStatus Status { get; set; }

        public virtual Event? Event { get; set; }
        public virtual User? User { get; set; }
    }
}
