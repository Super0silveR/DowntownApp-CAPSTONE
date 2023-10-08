using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class ProfileLightDto
    {
        public string? Bio { get; set; }
        public string? ColorCode { get; set; }
        public string? DisplayName { get; set; }
        public int Followers { get; set; }
        public int Following { get; set; }
        public bool IsContentCreator { get; set; } = false;
        public bool IsFollowing { get; set; } = false;
        public bool IsOpenToMessage { get; set; } = true;
        public bool IsPrivate { get; set; } = false;
        public string? Photo { get; set; }
        public string? UserName { get; set; }
    }
}
