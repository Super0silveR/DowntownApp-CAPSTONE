using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Commands
{
    public class ScheduledEventCommandDto
    {
        public Guid BarId { get; set; }
        public Guid EventId { get; set; }
        public DateTime Scheduled { get; set; }
        public string? Location { get; set; }
        public int Capacity { get; set; }
        public string? Guidelines { get; set; } // This is potentially a JSON document.
    }
}
