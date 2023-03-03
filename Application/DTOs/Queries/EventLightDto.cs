namespace Application.DTOs.Queries
{
    public class EventLightDto
    {
        public Guid? EventCategoryId { get; set; }
        public Guid? EventTypeId { get; set; }
        public string? Title { get; set; }
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
        public string? CreatorUserName { get; set; }
    }
}
