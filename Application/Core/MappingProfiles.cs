using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Event, Event>();

            CreateMap<EventDto, Event>();
        }
    }
}
