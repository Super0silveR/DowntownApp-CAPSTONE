using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasMany(u => u.Addresses)
                   .WithOne(ua => ua.User)
                   .HasForeignKey(ua => ua.UserId)
                   .HasConstraintName("FK_USER_ADDRESSES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.AttendedBarEvents)
                   .WithOne(bea => bea.Attendee)
                   .HasForeignKey(bea => bea.AttendeeId)
                   .HasConstraintName("FK_USER_ATTENDED_BAR_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.CommentedBarEvents)
                   .WithOne(bec => bec.Attendee)
                   .HasForeignKey(bec => bec.AttendeeId)
                   .HasConstraintName("FK_USER_COMMENTED_BAR_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.ContributedEvents)
                   .WithOne(ec => ec.User)
                   .HasForeignKey(ec => ec.UserId)
                   .HasConstraintName("FK_USER_CONTRIBUTED_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.CreatedBars)
                   .WithOne(b => b.Creator)
                   .HasForeignKey(b => b.CreatorId)
                   .HasConstraintName("FK_USER_CREATED_BARS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.CreatedEvents)
                   .WithOne(e => e.Creator)
                   .HasForeignKey(e => e.CreatorId)
                   .HasConstraintName("FK_USER_CREATED_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.CreatedEventCategories)
                   .WithOne(ec => ec.Creator)
                   .HasForeignKey(ec => ec.CreatorId)
                   .HasConstraintName("FK_USER_CREATED_EVENT_CATEGORIES")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.Followers)
                   .WithOne(uf => uf.Target)
                   .HasForeignKey(uf => uf.TargetId)
                   .HasConstraintName("FK_USER_FOLLOWERS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.Followings)
                   .WithOne(uf => uf.Observer)
                   .HasForeignKey(uf => uf.ObserverId)
                   .HasConstraintName("FK_USER_FOLLOWINGS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.Groups)
                   .WithOne(g => g.User)
                   .HasForeignKey(g => g.UserId)
                   .HasConstraintName("FK_USER_GROUPS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.LikedBars)
                   .WithOne(bl => bl.User)
                   .HasForeignKey(bl => bl.UserId)
                   .HasConstraintName("FK_USER_LIKED_BARS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.Questions)
                   .WithOne(q => q.User)
                   .HasForeignKey(q => q.UserId)
                   .HasConstraintName("FK_USER_QUESTIONS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.RatedEvents)
                   .WithOne(er => er.User)
                   .HasForeignKey(er => er.UserId)
                   .HasConstraintName("FK_USER_RATED_EVENTS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.UserChats)
                   .WithOne(uc => uc.User)
                   .HasForeignKey(uc => uc.UserId)
                   .HasConstraintName("FK_USER_CHATS")
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.UserChatRooms)
                   .WithOne(ucr => ucr.User)
                   .HasForeignKey(ucr => ucr.UserId)
                   .HasConstraintName("FK_USER_CHAT_ROOMS")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
