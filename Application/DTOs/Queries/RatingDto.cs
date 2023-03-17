using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class RatingDto
    {
        public DateTime Rated { get; set; } = DateTime.UtcNow;
        public int Vote { get; set; }
        public string? Review { get; set; }
        public ProfileDto User { get; set; } = new ProfileDto();
    }
}
