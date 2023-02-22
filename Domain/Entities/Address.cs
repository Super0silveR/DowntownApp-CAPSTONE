using Domain.Common;

namespace Domain.Entities
{
    public class Address : BaseAuditableEntity
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Region { get; set; }
        public string? PostalCode { get; set;}
        public string? Country { get; set;}
        public string? Description { get; set;}

        public virtual UserAddress? UserAddress { get; set; }
    }
}
