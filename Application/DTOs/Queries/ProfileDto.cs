﻿using Domain.Entities;

namespace Application.DTOs.Queries
{
    public class ProfileDto
    {
        public string? UserName { get; set; }
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? Photo { get; set; }

        public ICollection<UserPhoto>? Photos { get; set; }
    }
}
