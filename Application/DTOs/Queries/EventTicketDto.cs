using Domain.Entities;
using Domain.Enums;

namespace Application.DTOs.Queries
{
    public class EventTicketDto
    {
        public Guid? Id { get; set; }
        public Guid? ScheduledEventId { get; set; }
        public double? Price { get; set; }
        public string? Description { get; set; }
        public TicketClassification? Classification { get; set; }
        public ScheduledEvent? ScheduledEvent { get; set; }

    }
}
