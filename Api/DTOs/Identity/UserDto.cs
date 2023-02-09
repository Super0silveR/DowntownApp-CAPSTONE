namespace Api.DTOs.Identity
{
    public class UserDto
    {
        public string? DisplayName { get; set; }
        public string? Photo { get; set; } = null;
        public string? Token { get; set; }
        public string? UserName { get; set; }
    }
}
