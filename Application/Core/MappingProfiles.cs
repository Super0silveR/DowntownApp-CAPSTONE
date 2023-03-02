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

            CreateMap<EventContributor, EventContributorDto>()
                .ForMember(ec => ec.DisplayName, options => options.MapFrom(ec => ec.User!.DisplayName))
                .ForMember(ec => ec.UserName, options => options.MapFrom(ec => ec.User!.UserName))
                .ForMember(ec => ec.Bio, options => options.MapFrom(ec => ec.User!.Bio))
                .ForMember(ec => ec.Status, options => options.MapFrom(ec => ec.Status.ToString()));

            CreateMap<Event, Event>();

            CreateMap<Event, EventDto>()
                .ForMember(e => e.CreatorUserName, options => 
                    options.MapFrom(src => src.Contributors.FirstOrDefault(c => c.IsAdmin)!.User!.UserName))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventDto, Event>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventCategory, EventCategoryDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventCategoryDto, EventCategory>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));
        }
    }
}
