using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Persistence.Common;
using Persistence.Interceptors;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User, Role, Guid>, 
                               IDataContext
    {
        private readonly IMediator _mediator;
        private readonly AuditableEntitySaveChangesInterceptor _auditableEntitySaveChangesInterceptor;

        public DataContext(DbContextOptions options,
                           IMediator mediator,
                           AuditableEntitySaveChangesInterceptor auditableEntitySaveChangesInterceptor) : base(options)
        {
            _mediator = mediator;
            _auditableEntitySaveChangesInterceptor = auditableEntitySaveChangesInterceptor;
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

            builder.Entity<User>()
                .ToTable("Users");

            builder.Entity<Role>()
                .ToTable("Roles");

            builder.Entity<IdentityRoleClaim<Guid>>()
                .ToTable("RoleClaims");

            builder.Entity<IdentityUserClaim<Guid>>()
                .ToTable("UserClaims");

            builder.Entity<IdentityUserLogin<Guid>>()
                .ToTable("UserLogins");

            builder.Entity<IdentityUserRole<Guid>>()
                .ToTable("UserRoles");

            builder.Entity<IdentityUserToken<Guid>>()
                .ToTable("UserTokens");

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEvents(this);
            return await base.SaveChangesAsync(cancellationToken);
        }

        #endregion
    }
}
