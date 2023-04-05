using System;

namespace Application.DTOs
{
    public class ZoomMeetingDto
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public DateTime StartTime { get; set; }
        public int Duration { get; set; }
        public string? Agenda { get; set; }
        public string? ZoomMeetingId { get; set; }
        public string? ZoomMeetingPassword { get; set; }
        public Guid ZoomMeetingTypeId { get; set; }
    }
}
