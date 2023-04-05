namespace Application.DTOs.Commands
{
    public class ZoomMeetingTypeCommandDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? TimeZone { get; set; }
    }
}
