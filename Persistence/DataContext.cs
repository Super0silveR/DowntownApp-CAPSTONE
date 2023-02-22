using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Persistence.Common;
using Persistence.Interceptors;
using System.Reflection;

namespace Persistence
{
    /// <summary>
    /// Data Context for the whole application.
    /// </summary>
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
        public DbSet<Address> Addresses => Set<Address>();
        public DbSet<Avatar> Avatars => Set<Avatar>();
        public DbSet<Bar> Bars => Set<Bar>();
        public DbSet<BarEvent> BarEvents => Set<BarEvent>();
        public DbSet<BarEventAttendee> BarEventAttendees => Set<BarEventAttendee>();
        public DbSet<BarEventChallenge> BarEventChallenges => Set<BarEventChallenge>();
        public DbSet<BarEventComment> BarEventComments => Set<BarEventComment>();
        public DbSet<BarLike> BarLikes => Set<BarLike>();
        public DbSet<Challenge> Challenges => Set<Challenge>();
        public DbSet<ChallengeType> ChallengeTypes => Set<ChallengeType>();
        public DbSet<ChatRoom> ChatRooms => Set<ChatRoom>();
        public DbSet<ChatRoomType> ChatRoomTypes => Set<ChatRoomType>();
        public DbSet<Event> Events => Set<Event>();
        public DbSet<EventCategory> EventCategories => Set<EventCategory>();
        public DbSet<EventContributor> EventContributors => Set<EventContributor>();
        public DbSet<EventRating> EventRatings => Set<EventRating>();
        public DbSet<EventType> EventTypes => Set<EventType>();
        public DbSet<Group> Groups => Set<Group>();
        public DbSet<Question> Questions => Set<Question>();
        public DbSet<QuestionType> QuestionTypes => Set<QuestionType>();
        public DbSet<UserAddress> UserAddresses => Set<UserAddress>();
        public DbSet<UserChat> UserChats => Set<UserChat>();
        public DbSet<UserChatRoom> UserChatRooms => Set<UserChatRoom>();
        public DbSet<UserFollowing> UserFollowings => Set<UserFollowing>();
        public DbSet<UserGroup> UserGroups => Set<UserGroup>();
        public DbSet<UserPhoto> UserPhotos => Set<UserPhoto>();
        public DbSet<UserQuestion> UserQuestions => Set<UserQuestion>();

        #region overrides

        /// <summary>
        /// [override]
        /// Method that configure the data schema needed for EF Core.
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            #region AspNet Entities Change Default Table Names

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

            #endregion

            #region Custom Entities Configuration

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            #endregion
        }

        /// <summary>
        /// [override]
        /// Method that is called when the data configuration has started.
        /// Here we add an interception for specific changes on our `BaseAuditableEntity`
        /// so we can update certain fields when actions are made on this type of entity.
        /// </summary>
        /// <param name="optionsBuilder"></param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(_auditableEntitySaveChangesInterceptor);
        }

        /// <summary>
        /// [override]
        /// Method that is used for dispatching changes in the database.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEvents(this);
            return await base.SaveChangesAsync(cancellationToken);
        }

        #endregion
    }
}
