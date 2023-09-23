using Application.Handlers.Profiles;
using Domain.Enums;

namespace Application.DTOs.Commands
{
    /// <summary>
    /// Class representing the data transfer object for the commands related to EventContributor entities.
    /// </summary>
    public class EventContributorCommandDto
    {
        public Guid EventId { get; set; }
        public Guid UserId { get; set; }
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public ContributorStatus Status { get; set; }
    }
}
