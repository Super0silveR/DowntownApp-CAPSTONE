using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class CreatorReviewConfiguration : IEntityTypeConfiguration<CreatorReviews>
    {
        public void Configure(EntityTypeBuilder<CreatorReviews> builder)
        {
            builder.HasKey(cr => new { cr.RevieweeId, cr.ReviewerId })
                   .HasName("PK_USER_CREATOR_REVIEW");

            builder.HasOne(cr => cr.Reviewee)
                   .WithMany(cp => cp.CreatorReviews)
                   .HasForeignKey(cr => cr.RevieweeId)
                   .HasConstraintName("FK_REVIEWEE_ID");

            builder.HasOne(cr => cr.Reviewer)
                   .WithMany(u => u.ReviewedCreators)
                   .HasForeignKey(cr => cr.ReviewerId)
                   .HasConstraintName("FK_REVIEWER_ID");
        }
    }
}
