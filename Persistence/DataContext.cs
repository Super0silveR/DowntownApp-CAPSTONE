using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DataContext() { }

        public DataContext(DbContextOptions options) : base(options) { }

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


        /// <summary>
        /// List of database entities, i.e. DbSets.
        /// </summary>
        public DbSet<Event>? Events { get; set; }
        public DbSet<EventAttendee>? EventAttendees { get; set; }
    }
}
