using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CreatorContentGenreConfiguration : IEntityTypeConfiguration<CreatorContentGenres>
    {
        public void Configure(EntityTypeBuilder<CreatorContentGenres> builder)
        {
            builder.HasKey(ccg => new { ccg.ContentGenreId, ccg.CreatorProfileId })
                   .HasName("PK_CREATOR_CONTENT_GENRE_ID");

            builder.HasOne(ccg => ccg.Genre)
                   .WithMany(cg => cg.GenredCreators)
                   .HasForeignKey(ccg => ccg.ContentGenreId)
                   .HasConstraintName("FK_CREATOR_CONTENT_GENRE_ID");

            builder.HasOne(ccg => ccg.Creator)
                   .WithMany(cp => cp.CreatorContentGenres)
                   .HasForeignKey(ccg => ccg.CreatorProfileId)
                   .HasConstraintName("FK_CREATOR_PROFILE_CREATOR_CONTENT_GENRE_ID");
        }
    }
}
