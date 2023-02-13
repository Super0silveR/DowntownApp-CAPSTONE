namespace Domain.Common
{
    public abstract class AuditableEntity
    {
        public string? CreatedBy { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public string? LastModifiedBy { get; set; }
        public DateTime LastModified { get; set; } = DateTime.MinValue;
        public bool IsActive { get; set; }
    }
}
