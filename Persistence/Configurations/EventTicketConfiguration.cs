using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

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
