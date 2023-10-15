namespace Application.DTOs.Commands
{
    /// <summary>
    /// Class representing the DTO used for updating the user base profile.
    /// </summary>
    public class ProfileCommandDto
    {
        public string? Bio { get; set; }
        public string? ColorCode { get; set; }
        public string? DisplayName { get; set; }
        public bool IsOpenToMessage { get; set; }
        public bool IsPrivate { get; set; }
        public string? Location { get; set; }
    }
}
