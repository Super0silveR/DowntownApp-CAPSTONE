using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class UserGroupConfiguration : IEntityTypeConfiguration<UserGroup>
    {
        public void Configure(EntityTypeBuilder<UserGroup> builder)
        {
            builder.HasKey(ug => new { ug.GroupId, ug.UserId })
                   .HasName("PK_USER_GROUP_ID");

            builder.HasOne(ug => ug.Group)
                   .WithMany(g => g.GroupedUsers)
                   .HasForeignKey(ug => ug.GroupId)
                   .HasConstraintName("FK_USER_GROUP_GROUP_ID");

            builder.HasOne(ug => ug.User)
                   .WithMany(u => u.Groups)
                   .HasForeignKey(ug => ug.UserId)
                   .HasConstraintName("FK_USER_GROUP_USER_ID");
        }
    }
}
