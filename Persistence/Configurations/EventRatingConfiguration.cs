using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventRatingConfiguration : IEntityTypeConfiguration<EventRating>
    {
        public void Configure(EntityTypeBuilder<EventRating> builder)
        {
            builder.HasKey(er => new { er.EventId, er.UserId })
                   .HasName("PK_EVENT_RATING");

            builder.HasOne(er => er.Event)
                   .WithMany(e => e.Ratings)
                   .HasForeignKey(er => er.EventId)
                   .HasConstraintName("FK_EVENT_RATING_EVENT_ID");

            builder.HasOne(er => er.User)
                   .WithMany(u => u.RatedEvents)
                   .HasForeignKey(er => er.UserId)
                   .HasConstraintName("FK_EVENT_RATING_USER_ID");
        }
    }
}
