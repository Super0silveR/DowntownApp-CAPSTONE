using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserChatConfiguration : IEntityTypeConfiguration<UserChat>
    {
        public void Configure(EntityTypeBuilder<UserChat> builder)
        {
            builder.HasOne(uc => uc.ChatRoom)
                   .WithMany(cr => cr.UserChats)
                   .HasForeignKey(uc => uc.ChatRoomId)
                   .HasConstraintName("FK_USER_CHAT_USER_CHAT_ROOM_ID");
        }
    }
}
