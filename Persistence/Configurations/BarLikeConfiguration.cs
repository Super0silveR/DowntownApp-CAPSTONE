using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class BarLikeConfiguration : IEntityTypeConfiguration<BarLike>
    {
        public void Configure(EntityTypeBuilder<BarLike> builder)
        {
            builder.HasKey(bl => new { bl.UserId, bl.BarId })
                   .HasName("PK_BAR_LIKES");

            builder.HasOne(bl => bl.Bar)
                   .WithMany(b => b.Likes)
                   .HasForeignKey(bl => bl.BarId)
                   .HasConstraintName("FK_BAR_LIKE_BAR_ID");

            builder.HasOne(bl => bl.User)
                   .WithMany(u => u.LikedBars)
                   .HasForeignKey(bl => bl.UserId)
                   .HasConstraintName("FK_BAR_LIKE_USER_ID");
        }
    }
}
