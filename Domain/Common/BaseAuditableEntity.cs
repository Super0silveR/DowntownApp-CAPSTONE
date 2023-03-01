namespace Domain.Common
{
    public abstract class BaseAuditableEntity : BaseEntity
    {
        public Guid? CreatedBy { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public Guid? LastModifiedBy { get; set; }
        public DateTime LastModified { get; set; } = DateTime.MinValue;
    }
}
