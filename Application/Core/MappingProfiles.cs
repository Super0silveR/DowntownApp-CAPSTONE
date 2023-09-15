﻿
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Domain.Entities;
using Domain.Enums;

namespace Application.Core
{
    /// <summary>
    /// Class that represents the mapping profiles for every entity in our Domain, that we need to specify.
    /// Mostly used when trying to map a Dto to the Entity of origin.
    /// </summary>
    public class MappingProfiles : AutoMapper.Profile
    {
        public MappingProfiles()
        {
            CreateMap<Guid?, Guid>()
                .ConvertUsing((src, dest) => src ?? dest);

            /// Data transfert objects used for returning data.
            #region Query DTOs

            CreateMap<Bar, Bar>();

            CreateMap<Bar, BarDto>();

            CreateMap<ScheduledEvent, BarEventDto>();
            
            CreateMap<Event, Event>();

            CreateMap<Event, EventDto>()
                .ForMember(e => e.CreatorUserName, options => 
                    options.MapFrom(src => src.Contributors.FirstOrDefault(c => c.IsAdmin)!.User!.UserName))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventDto, Event>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<Event, EventDto>()
                .ForMember(edto => edto.Contributors, options => 
                    options.MapFrom(e => e.Contributors.Where(c => !c.Status.Equals(ContributorStatus.Removed))))
                .ForMember(edto => edto.CreatorUserName, options =>
                    options.MapFrom(src => src.Contributors.FirstOrDefault(c => c.Status.Equals(ContributorStatus.Creator))!.User!.UserName))
                .ForMember(edto => edto.Rating, options => options.MapFrom(e => e.Ratings))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<Event, EventLightDto>()
                .ForMember(edto => edto.CreatorUserName, options =>
                    options.MapFrom(src => src.Contributors.FirstOrDefault(c => c.Status.Equals(ContributorStatus.Creator))!.User!.UserName));

            CreateMap<EventCategory, EventCategoryDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventCategoryDto, EventCategory>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventType, EventTypeDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventTypeDto, EventType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChallengeType, ChallengeTypeDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChallengeTypeDto, ChallengeType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<QuestionType, QuestionTypeDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<QuestionTypeDto, QuestionType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChatRoomType, ChatRoomTypeDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChatRoomTypeDto, ChatRoomType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventContributor, EventContributorDto>()
                .ForMember(ec => ec.Status, options => options.MapFrom(ec => ec.Status.ToString()));

            CreateMap<EventRating, RatingDto>();

            CreateMap<ICollection<BarLike>, BarLikeDto>()
                .ForMember(bldto => bldto.Likes, options => options.MapFrom(bl => bl.Where(l => l.Vote).Count()))
                .ForMember(bldto => bldto.Dislikes, options => options.MapFrom(bl => bl.Where(l => !l.Vote).Count()))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => src is not null));

            CreateMap<ICollection<EventRating>, EventRatingDto>()
                .ForMember(erdto => erdto.Count, options => options.MapFrom(er => er.Count()))
                .ForMember(erdto => erdto.Value, options => options.MapFrom(er => er.Average(r => r.Vote)))
                .ForMember(erdto => erdto.Ratings, options => options.MapFrom(er => er))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => src is not null));

            CreateMap<User, ProfileDto>()
                .ForMember(pdto => pdto.Followers, options => options.MapFrom(u => u.Followers.Count))
                .ForMember(pdto => pdto.Following, options => options.MapFrom(u => u.Followings.Count))
                .ForMember(pdto => pdto.Photo, options => options.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain)!.Url));

            CreateMap<User, UserLightDto>()
                .ForMember(pdto => pdto.Photo, options => options.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain)!.Url));

            #endregion

            /// Data transfert objects used for writing data.
            #region Command DTOs

            CreateMap<BarCommandDto, Bar>();

            CreateMap<EventCategoryCommandDto, EventCategory>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));
            
            CreateMap<EventCommandDto, Event>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));
            
            CreateMap<EventTypeCommandDto, EventType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChallengeTypeCommandDto, ChallengeType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<QuestionTypeCommandDto, QuestionType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChatRoomTypeCommandDto, ChatRoomType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));
            #endregion
        }
    }
}
