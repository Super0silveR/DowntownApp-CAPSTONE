namespace Application.DTOs.Queries
{
    public class ChallengeTypeDto
    {
        public Guid? Id { get; set; }
        public Guid? CreatorId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }
    }
}
