namespace Application.DTOs
{
    public class EventTypeDto
    {
        public Guid? Id { get; set; }
        public Guid? CreatorId { get; set; }
        public string? Title { get; set; }
        public string? Color { get; set; }
    }
}
