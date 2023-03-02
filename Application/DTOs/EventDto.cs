namespace Application.DTOs
{
    public class EventDto
    {
        public Guid? Id { get; set; }
        public Guid? CreatorId { get; set; }
        public Guid? EventCategoryId { get; set; }
        public Guid? EventTypeId { get; set; }
        public string? Title { get; set; }
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
        public string? CreatorUserName { get; set; }
        public double? Rating { get; set; }
        public bool IsActive { get; set; } = true;

        public virtual ICollection<EventContributorDto>? Contributors { get; set; }
    }
}
