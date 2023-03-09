namespace Application.DTOs.Commands
{
    public class EventCommandDto
    {
        public Guid? CreatorId { get; set; }
        public Guid? EventCategoryId { get; set; }
        public Guid? EventTypeId { get; set; }
        public string? Title { get; set; }
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
    }
}
