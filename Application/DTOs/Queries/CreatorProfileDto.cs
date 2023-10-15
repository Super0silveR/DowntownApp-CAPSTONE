using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class CreatorProfileDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string? Collaborations { get; set; }
        public string? PastExperiences { get; set; }
        public string? StandOut { get; set; }
        public string? LogoUrl { get; set; }
        
        public ICollection<CreatorContentGenres> Genres = new List<CreatorContentGenres>();
        public ICollection<CreatorReviews> Reviews = new List<CreatorReviews>();
    }
}
