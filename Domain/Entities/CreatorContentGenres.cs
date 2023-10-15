using Domain.Common;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the relationship between CreatorProfiles and ContentGenres.
    /// </summary>
    public class CreatorContentGenres : BaseAuditableEntity
    {
        public Guid CreatorProfileId { get; set; }
        public int ContentGenreId { get; set; }

        public virtual CreatorProfiles? Creator { get; set; }
        public virtual ContentGenres? Genre { get; set; }
    }
}
