using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Persistence.Common;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>, 
                               IDataContext
    {
        private readonly IMediator _mediator;

        public DataContext(DbContextOptions options,
                           IMediator mediator) : base(options)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// List of database entities, i.e. DbSets.
        /// </summary>
        public DbSet<Event> Events => Set<Event>();
        public DbSet<EventAttendee> EventAttendees => Set<EventAttendee>();

        #region overrides

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Creating the key as the combinaison of userId and eventId.
            builder.Entity<EventAttendee>(ea => ea.HasKey(ea => new { ea.AttendeeId, ea.EventId }));

            // Creating the relationship from the User perspective.
            builder.Entity<EventAttendee>()
                   .HasOne(ea => ea.Attendee)
                   .WithMany(a => a.AttendedEvents)
                   .HasForeignKey(ea => ea.AttendeeId);

            //Creating the relationship from the Event perspective.
            builder.Entity<EventAttendee>()
                   .HasOne(ea => ea.Event)
                   .WithMany(e => e.Attendees)
                   .HasForeignKey(ea => ea.EventId);

            //todo.
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEvents(this);
            return await base.SaveChangesAsync(cancellationToken);
        }

        #endregion
    }
}
