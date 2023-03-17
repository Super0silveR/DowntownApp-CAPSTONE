﻿namespace Application.DTOs.Queries
{
    /// <summary>
    /// Class representing the data transfer object for the EventContributor entity.
    /// </summary>
    public class EventContributorDto : ProfileDto
    {
        public bool IsActive { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime? Created { get; set; }
        public string? Status { get; set; }
    }
}
