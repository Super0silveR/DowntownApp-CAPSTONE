using Domain.Common;

namespace Domain.Entities
{
    public class UserAddress : BaseAuditableEntity
    {
        public Guid UserId { get; set; }
        public Guid AddressId { get; set; }
        public bool IsMain { get; set; }

        public virtual Address? Adddress { get; set; }
        public virtual User? User { get; set; }
    }
}
