using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    /// <summary>
    /// Class that represents the mapping profiles for every entity in our Domain, that we need to specify.
    /// Mostly used when trying to map a Dto to the Entity of origin.
    /// </summary>
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Guid?, Guid>()
                .ConvertUsing((src, dest) => src ?? dest);

            CreateMap<Event, Event>();

            CreateMap<EventDto, Event>()
                .ForAllMembers(options =>
                {
                    options.Condition((src, dest, srcMember) => srcMember != null);
                });
        }
    }
}
