using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ContentGenresConfiguration : IEntityTypeConfiguration<ContentGenres>
    {
        public void Configure(EntityTypeBuilder<ContentGenres> builder)
        {
            builder.HasMany(cg => cg.GenredCreators)
                   .WithOne(ccg => ccg.Genre)
                   .HasForeignKey(ccg => ccg.ContentGenreId)
                   .HasConstraintName("FK_CREATOR_CONTENT_GENRE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
