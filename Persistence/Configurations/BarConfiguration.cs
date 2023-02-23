using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class BarConfiguration : IEntityTypeConfiguration<Bar>
    {
        public void Configure(EntityTypeBuilder<Bar> builder)
        {
            builder.HasOne(b => b.Creator)
                   .WithMany(u => u.CreatedBars)
                   .HasForeignKey(b => b.CreatorId)
                   .HasConstraintName("FK_BAR_CREATOR_ID");

            builder.HasMany(b => b.Likes)
                   .WithOne(bl => bl.Bar)
                   .HasForeignKey(bl => bl.BarId)
                   .HasConstraintName("FK_BAR_LIKES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(b => b.ScheduledEvents)
                   .WithOne(be => be.Bar)
                   .HasForeignKey(be => be.BarId)
                   .HasConstraintName("FK_BAR_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
