using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Commands
{
    public class EventAtendeeCommandDto
    {
        public Guid ScheduledEventId { get; set; }
        public Guid? TicketId { get; set; }
        public bool IsHost { get; set; }
    }
}
