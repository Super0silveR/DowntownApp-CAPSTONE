using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class User : IdentityUser<Guid>
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }

        public virtual ICollection<EventAttendee> AttendedEvents { get; set; } = new List<EventAttendee>();
    }
}
