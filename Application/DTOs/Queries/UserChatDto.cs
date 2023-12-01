namespace Application.DTOs.Queries
{
    public class UserChatDto
    {
        public Guid Id { get; set; }
        public DateTime SentAt { get; set; }
        public string? Message { get; set; }
        public string? UserName { get; set; }
        public string? DisplayName { get; set; }
        public string? Image { get; set; }
        public bool IsMe { get; set; } = false;
        public bool IsLastInGroup { get; set; } = true;
    }
}
