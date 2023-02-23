using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserChatRoomConfiguration : IEntityTypeConfiguration<UserChatRoom>
    {
        public void Configure(EntityTypeBuilder<UserChatRoom> builder)
        {
            builder.HasKey(ucr => new { ucr.ChatRoomId, ucr.UserId })
                   .HasName("PK_USER_CHAT_ROOM_ID");

            builder.HasOne(ucr => ucr.ChatRoom)
                   .WithMany(cr => cr.ChatRoomUsers)
                   .HasForeignKey(ucr => ucr.ChatRoomId)
                   .HasConstraintName("FK_USER_CHAT_ROOM_CHAT_ROOM_ID");

            builder.HasOne(ucr => ucr.User)
                   .WithMany(u => u.UserChatRooms)
                   .HasForeignKey(ucr => ucr.UserId)
                   .HasConstraintName("FK_USER_CHAT_ROOM_USER_ID");

            builder.HasMany(ucr => ucr.UserChats)
                   .WithOne(uc => uc.UserChatRoom)
                   .HasForeignKey(uc => new { uc.ChatRoomId, uc.UserId })
                   .HasConstraintName("FK_USER_CHAT_ROOM_USER_CHAT_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
