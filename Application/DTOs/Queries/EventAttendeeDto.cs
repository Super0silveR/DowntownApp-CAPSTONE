namespace Application.DTOs.Queries
{
    public class EventAttendeeDto
    {
        public Guid Id { get; set; }
        public Guid AttendeeId { get; set; }
        public Guid ScheduledEventId { get; set; }
        public Guid? TicketId { get; set; }
        public bool IsHost { get; set; }
    }
}
