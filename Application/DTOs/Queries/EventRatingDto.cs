namespace Application.DTOs.Queries
{
    /// <summary>
    /// Class that represents the data transfert object for a List<EventRating>.
    /// </summary>
    public class EventRatingDto
    {
        public double? Value { get; set; }
        public int Count { get; set; } = 0;
        public ICollection<RatingDto>? Ratings { get; set; }
    }
}
