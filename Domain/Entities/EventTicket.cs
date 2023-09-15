using Domain.Common;
using Domain.Enums;

namespace Domain.Entities
{
    public class EventTicket : BaseAuditableEntity
    {
        public Guid ScheduledEventId { get; set; }
        public string? Description { get; set; }
        public double? Price { get; set; } = null;
        public TicketClassification TicketClassification { get; set; } = TicketClassification.Default;

        public ScheduledEvent? ScheduledEvent { get; set; }
    }
}
