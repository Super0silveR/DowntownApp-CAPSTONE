using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class ProfileDto
    {
        public Guid? Id { get; set; }
        public string? Bio { get; set; }
        public string? ColorCode { get; set; }
        public string? DisplayName { get; set; }
        public int Followers { get; set; }
        public int Following { get; set; }
        public bool IsContentCreator { get; set; } = false;
        public bool IsFollowing { get; set; } = false;
        public bool IsOpenToMessage { get; set; } = true;
        public bool IsPrivate { get; set; } = false;
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Photo { get; set; }
        public string? UserName { get; set; }

        public CreatorProfileDto? CreatorProfile { get; set; }

        public ICollection<UserPhoto>? Photos { get; set; }
        public ICollection<UserQuestion>? Questions { get; set; }
    }
}
