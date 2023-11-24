using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class ScheduledEventDto
    {
        public Guid Id { get; set; }
        public Guid BarId { get; set; }
        public Guid EventId { get; set; }
        public DateTime Scheduled { get; set; }
        public string? Location { get; set; }
        public int Capacity { get; set; }
        public string? Guidelines { get; set; } // This is potentially a JSON document.
        public int CommentCount { get; set; }
        public int AvailableTickets { get; set; }
    }
}
