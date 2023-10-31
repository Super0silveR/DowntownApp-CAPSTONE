using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class EventTicketConfiguration : IEntityTypeConfiguration<EventTicket>
    {
        public void Configure(EntityTypeBuilder<EventTicket> builder)
        {
            builder.HasOne(et => et.ScheduledEvent)
                .WithMany(se => se.Tickets)
                .HasForeignKey(et => et.ScheduledEventId)
                .HasConstraintName("FK_EVENT_EVENT_TICKET_ID");
        }
    }
}
