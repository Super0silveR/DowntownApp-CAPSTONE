using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserChatConfiguration : IEntityTypeConfiguration<UserChat>
    {
        public void Configure(EntityTypeBuilder<UserChat> builder)
        {
            builder.HasOne(uc => uc.UserChatRoom)
                   .WithMany(ucr => ucr.UserChats)
                   .HasForeignKey(uc => new { uc.ChatRoomId, uc.UserId })
                   .HasConstraintName("FK_USER_CHAT_USER_CHAT_ROOM_ID");
        }
    }
}
