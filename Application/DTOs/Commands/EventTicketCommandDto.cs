using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Commands
{
    public class EventTicketCommandDto
    {
        public Guid? Id { get; set; }
        public Guid ScheduledEventId { get; set; }
        public string? Description { get; set; }
        public double? Price { get; set; }
        public TicketClassification TicketClassification { get; set; } = TicketClassification.Default;
        public ScheduledEvent? ScheduledEvent { get; set; }
    }
}
