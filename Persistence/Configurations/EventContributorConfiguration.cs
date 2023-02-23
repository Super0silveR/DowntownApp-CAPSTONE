using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventContributorConfiguration : IEntityTypeConfiguration<EventContributor>
    {
        public void Configure(EntityTypeBuilder<EventContributor> builder)
        {
            builder.HasKey(eco => new { eco.EventId, eco.UserId })
                   .HasName("PK_EVENT_CONTRIBUTOR");

            builder.HasOne(eco => eco.Event)
                   .WithMany(e => e.Contributors)
                   .HasForeignKey(eco => eco.EventId)
                   .HasConstraintName("FK_EVENT_CONTRIBUTOR_EVENT_ID");

            builder.HasOne(eco => eco.User)
                   .WithMany(u => u.ContributedEvents)
                   .HasForeignKey(eco => eco.UserId)
                   .HasConstraintName("FK_EVENT_CONTRIBUTOR_USER_ID");
        }
    }
}
