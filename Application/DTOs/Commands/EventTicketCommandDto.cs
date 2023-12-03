using Domain.Enums;


namespace Application.DTOs.Commands
{
    public class EventTicketCommandDto
    {
        public Guid? ScheduledEventId { get; set; }
        public string? Description { get; set; }
        public double? Price { get; set; }
        public TicketClassification TicketClassification { get; set; } = TicketClassification.Default;
    }
}
