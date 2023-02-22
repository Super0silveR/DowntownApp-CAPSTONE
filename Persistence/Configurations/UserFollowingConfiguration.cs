using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserFollowingConfiguration : IEntityTypeConfiguration<UserFollowing>
    {
        public void Configure(EntityTypeBuilder<UserFollowing> builder)
        {
            builder.HasKey(uf => new { uf.ObserverId, uf.TargetId })
                   .HasName("PK_USER_FOLLOWING");

            builder.HasOne(uf => uf.Observer)
                   .WithMany(u => u.Followings)
                   .HasForeignKey(uf => uf.ObserverId)
                   .HasConstraintName("FK_USER_FOLLOWING_OBSERVER_ID");

            builder.HasOne(uf => uf.Target)
                   .WithMany(u => u.Followers)
                   .HasForeignKey(uf => uf.TargetId)
                   .HasConstraintName("FK_USER_FOLLOWING_TARGET_ID");
        }
    }
}
