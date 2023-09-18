namespace Application.DTOs.Queries
{
    public class BarDto
    {
        public Guid CreatorId { get; set; }
        public Guid? Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public double CoverCost { get; set; } = 0.0;
        public bool IsActive { get; set; } = false;
        public ProfileLightDto? Creator { get; set; }
        public BarLikeDto? Likes { get; set; }
        public ICollection<BarEventDto> ScheduledEvents { get; set; } = new HashSet<BarEventDto>();
    }
}
