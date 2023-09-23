namespace Application.DTOs.Commands
{
    public class BarCommandDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public double CoverCost { get; set; }
        public bool IsActive { get; set; }
    }
}
