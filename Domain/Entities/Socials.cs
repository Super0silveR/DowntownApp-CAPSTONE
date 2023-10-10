using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public class Socials : BaseAuditableEntity
    {
        public Guid UserId { get; set; }
        public string? Url { get; set; }
        public SocialType SocialType { get; set; }

        public virtual User? User { get; set; }
    }
}
