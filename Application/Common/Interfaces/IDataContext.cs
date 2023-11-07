using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    /// <summary>
    /// DataContext interface.
    /// </summary>
    public interface IDataContext
    {
        // Entities
        public DbSet<Address> Addresses { get; }
        public DbSet<Avatar> Avatars { get; }
        public DbSet<Bar> Bars { get; }
        public DbSet<BarLike> BarLikes { get; }
        public DbSet<Challenge> Challenges { get; }
        public DbSet<ChallengeType> ChallengeTypes { get; }
        public DbSet<ChatRoom> ChatRooms { get; }
        public DbSet<ChatRoomType> ChatRoomTypes { get; }
        public DbSet<ContentGenres> ContentGenres { get; }
        public DbSet<CreatorContentGenres> CreatorContentGenres { get; }
        public DbSet<CreatorProfiles> CreatorProfiles { get; }
        public DbSet<CreatorReviews> CreatorReviews { get; }
        public DbSet<Event> Events { get; }
        public DbSet<EventCategory> EventCategories { get; }
        public DbSet<EventContributor> EventContributors { get; }
        public DbSet<EventRating> EventRatings { get; }
        public DbSet<EventTicket> EventTickets { get; }
        public DbSet<EventType> EventTypes { get; }
        public DbSet<Group> Groups { get; }
        public DbSet<Question> Questions { get; }
        public DbSet<QuestionType> QuestionTypes { get; }
        public DbSet<ScheduledEvent> ScheduledEvents { get; }
        public DbSet<EventAttendee> ScheduledEventAttendees { get; }
        public DbSet<EventChallenge> ScheduledEventChallenges { get; }
        public DbSet<EventComment> ScheduledEventComments { get; }
        public DbSet<EventTicket> ScheduledEventTickets { get; }
        public DbSet<Socials> Socials { get; }
        public DbSet<UserAddress> UserAddresses { get; }
        public DbSet<UserChat> UserChats { get; }
        public DbSet<UserChatRoom> UserChatRooms { get; }
        public DbSet<UserFollowing> UserFollowings { get; }
        public DbSet<UserGroup> UserGroups { get; }
        public DbSet<UserPhoto> UserPhotos { get; }
        public DbSet<UserQuestion> UserQuestions { get; }
        public DbSet<EventTicket> EventTicket { get; }

        // overrides
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
