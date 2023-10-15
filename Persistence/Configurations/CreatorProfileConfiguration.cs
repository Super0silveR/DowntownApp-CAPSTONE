using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CreatorProfileConfiguration : IEntityTypeConfiguration<CreatorProfiles>
    {
        public void Configure(EntityTypeBuilder<CreatorProfiles> builder)
        {
            builder.Property(cp => cp.Collaborations)
                   .HasColumnType("TEXT");

            builder.Property(cp => cp.PastExperiences)
                   .HasColumnType("TEXT");

            builder.Property(cp => cp.StandOut)
                   .HasColumnType("TEXT");

            builder.HasKey(cp => cp.UserId)
                   .HasName("PK_CREATOR_PROFILE_USER_ID");

            builder.HasOne(cp => cp.Creator)
                   .WithOne(u => u.CreatorProfile)
                   .HasForeignKey<CreatorProfiles>(cp => cp.UserId)
                   .HasConstraintName("FK_CREATOR_PROFILE_USER_ID");

            builder.HasMany(cp => cp.CreatorContentGenres)
                   .WithOne(ccg => ccg.Creator)
                   .HasForeignKey(cp => cp.CreatorProfileId)
                   .HasConstraintName("FK_CREATOR_PROFILE_GENRE_ID")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(cp => cp.CreatorReviews)
                   .WithOne(cr => cr.Reviewee)
                   .HasForeignKey(cp => cp.RevieweeId)
                   .HasConstraintName("FK_CREATOR_PROFILE_REVIEWEE_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
