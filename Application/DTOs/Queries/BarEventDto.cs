using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class BarEventDto
    {
        public DateTime Scheduled { get; set; }
        public bool IsHost { get; set; }
        public int Capacity { get; set; }
        public string? Guidelines { get; set; }
        public EventLightDto? Event { get; set; }
    }
}
