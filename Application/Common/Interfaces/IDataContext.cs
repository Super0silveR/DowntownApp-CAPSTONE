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
        DbSet<Address> Addresses { get; }
        DbSet<Avatar> Avatars { get; }
        DbSet<Bar> Bars { get; }
        DbSet<ScheduledEvent> ScheduledEvents { get; }
        DbSet<EventAttendee> ScheduledEventAttendees { get; }
        DbSet<EventChallenge> ScheduledEventChallenges { get; }
        DbSet<EventComment> ScheduledEventComments { get; }
        DbSet<BarLike> BarLikes { get; }
        DbSet<Challenge> Challenges { get; }
        DbSet<ChallengeType> ChallengeTypes { get; }
        DbSet<ChatRoom> ChatRooms { get; }
        DbSet<ChatRoomType> ChatRoomTypes { get; }
        DbSet<Event> Events { get; }
        DbSet<EventCategory> EventCategories { get; }
        DbSet<EventContributor> EventContributors { get; }
        DbSet<EventRating> EventRatings { get; }
        DbSet<EventType> EventTypes { get; }
        DbSet<EventTicket> EventTickets { get; }
        DbSet<Group> Groups { get; }
        DbSet<Question> Questions { get; }
        DbSet<QuestionType> QuestionTypes { get; }
        DbSet<User> Users { get; }
        DbSet<UserAddress> UserAddresses { get; }
        DbSet<UserChat> UserChats { get; }
        DbSet<UserChatRoom> UserChatRooms { get; }
        DbSet<UserFollowing> UserFollowings { get; }
        DbSet<UserGroup> UserGroups { get; }
        DbSet<UserPhoto> UserPhotos { get; }
        DbSet<UserQuestion> UserQuestions { get; }

        // overrides
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
