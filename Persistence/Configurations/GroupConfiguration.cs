using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            builder.HasMany(g => g.GroupedUsers)
                   .WithOne(ug => ug.Group)
                   .HasForeignKey(ug => ug.GroupId)
                   .HasConstraintName("FK_GROUP_USER_GROUP_ID")
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
