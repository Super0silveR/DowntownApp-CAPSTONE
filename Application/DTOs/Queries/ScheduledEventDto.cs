using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class ScheduledEventDto
    {
        public Guid BarId { get; set; }
        public Guid EventId { get; set; }
        public DateTime Scheduled { get; set; }
        public int Capacity { get; set; }
        public string? Guidelines { get; set; } // This is potentially a JSON document.
        public int CommentCount { get; set; }
        public int AvailableTickets { get; set; }

        //public virtual ICollection<EventChallenge> Challenges { get; set; } = new HashSet<EventChallenge>();
        //public virtual ICollection<EventComment> Comments { get; set; } = new HashSet<EventComment>();
        public ICollection<EventAttendeeDto> Attendees { get; set; } = new List<EventAttendeeDto>();
        //public virtual ICollection<EventTicket> Tickets { get; set; } = new HashSet<EventTicket>();
    }
}
