using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    /// <summary>
    /// Entity that represents the application user (& identity user)
    /// </summary>
    public class User : IdentityUser<Guid>
    {
        public string? Bio { get; set; }
        public string? ColorCode { get; set; }
        public string? DisplayName { get; set; }
        public bool IsContentCreator { get; set; } = false;
        public bool IsOpenToMessage { get; set; } = true;
        public bool IsPrivate { get; set; } = false;
        public string? Location { get; set; }

        public virtual Avatar? Avatar { get; set; }
        public virtual ICollection<UserAddress> Addresses { get; set; } = new HashSet<UserAddress>();
        public virtual ICollection<BarEventAttendee> AttendedBarEvents { get; set; } = new HashSet<BarEventAttendee>();
        public virtual ICollection<BarEventComment> CommentedBarEvents { get; set; } = new HashSet<BarEventComment>();
        public virtual ICollection<EventContributor> ContributedEvents { get; set; } = new HashSet<EventContributor>(); 
        public virtual ICollection<Bar> CreatedBars { get; set; } = new HashSet<Bar>();
        public virtual ICollection<Event> CreatedEvents { get; set; } = new HashSet<Event>();
        public virtual ICollection<UserFollowing> Followers { get; set; } = new HashSet<UserFollowing>();
        public virtual ICollection<UserFollowing> Followings { get; set; } = new HashSet<UserFollowing>();
        public virtual ICollection<UserGroup> Groups { get; set; } = new HashSet<UserGroup>();
        public virtual ICollection<BarLike> LikedBars { get; set; } = new HashSet<BarLike>();
        public virtual ICollection<UserPhoto> Photos { get; set; } = new HashSet<UserPhoto>();
        public virtual ICollection<UserQuestion> Questions { get; set; } = new HashSet<UserQuestion>();
        public virtual ICollection<EventRating> RatedEvents { get; set; } = new HashSet<EventRating>();
        public virtual ICollection<UserChat> UserChats { get; set; } = new HashSet<UserChat>();
        public virtual ICollection<UserChatRoom> UserChatRooms { get; set; } = new HashSet<UserChatRoom>();

        /// Lookup Creations
        public virtual ICollection<EventCategory> CreatedEventCategories { get; set; } = new HashSet<EventCategory>();
        public virtual ICollection<EventType> CreatedEventTypes { get; set; } = new HashSet<EventType>();
        public virtual ICollection<ChallengeType> CreatedChallengesTypes { get; set; } = new HashSet<ChallengeType>();


    }
}
