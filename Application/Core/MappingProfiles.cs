
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Domain.Entities;
using Domain.Enums;
using Microsoft.VisualBasic.FileIO;

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
            string? currentUserName = null;

            CreateMap<Guid?, Guid>()
                .ConvertUsing((src, dest) => src ?? dest);

            /// Data transfert objects used for returning data.
            #region Query DTOs

            CreateMap<Bar, Bar>();

            CreateMap<Bar, BarDto>();

            CreateMap<CreatorProfiles, CreatorProfileDto>();

            CreateMap<ScheduledEvent, BarEventDto>();
            
            CreateMap<Event, Event>();

            CreateMap<EventDto, Event>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventTicket, EventTicketDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventTicketDto, EventTicket>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<Event, EventDto>()
                .ForMember(edto => edto.Contributors, options => 
                    options.MapFrom(e => e.Contributors.Where(c => !c.Status.Equals(ContributorStatus.Removed))))
                .ForMember(edto => edto.CreatorUserName, options =>
                    options.MapFrom(src => src.Creator!.UserName))
                .ForMember(edto => edto.Rating, options => options.MapFrom(e => e.Ratings))
                .ForMember(edto => edto.Schedules, options => options.MapFrom(e => e.ScheduledEvents))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<Event, EventLightDto>()
                .ForMember(edto => edto.CreatorUserName, options =>
                    options.MapFrom(src => src.Contributors.FirstOrDefault(c => c.Status.Equals(ContributorStatus.Creator))!.User!.UserName));

            CreateMap<EventAttendee, EventAttendeeDto>()
                .ForMember(edto => edto.DisplayName, options => options.MapFrom(ea => ea.Attendee!.DisplayName))
                .ForMember(edto => edto.UserName, options => options.MapFrom(ea => ea.Attendee!.UserName))
                .ForMember(edto => edto.Bio, options => options.MapFrom(ea => ea.Attendee!.Bio))
                .ForMember(edto => edto.Image, options => options.MapFrom(ea => ea.Attendee!.Photos.FirstOrDefault(p => p.IsMain)!.Url))
                .ForMember(edto => edto.FollowersCount, options => options.MapFrom(ea => ea.Attendee!.Followers.Count))
                .ForMember(edto => edto.FollowersCount, options => options.MapFrom(ea => ea.Attendee!.Followings.Count))
                .ForMember(edto => edto.IsFollowing, options => options.MapFrom(ea => ea.Attendee!.Followers.Any(x => x.Observer!.UserName == currentUserName)));

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

            CreateMap<ScheduledEvent, ScheduledEventDto>()
                .ForMember(se => se.AvailableTickets, options => options.MapFrom(se => se.Tickets.Count))
                .ForMember(se => se.CommentCount, options => options.MapFrom(se => se.Comments.Count))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

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
                .ForMember(pdto => pdto.CreatorProfile, options => options.MapFrom(u => u.CreatorProfile))
                .ForMember(pdto => pdto.Followers, options => options.MapFrom(u => u.Followers.Count))
                .ForMember(pdto => pdto.Following, options => options.MapFrom(u => u.Followings.Count))
                .ForMember(pdto => pdto.Photo, options => options.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain)!.Url))
                .ForMember(pdto => pdto.IsFollowing, options => options.MapFrom(u => u.Followers.Any(x => x.Observer!.UserName == currentUserName)));

            CreateMap<User, ProfileLightDto>()
                .ForMember(pdto => pdto.Followers, options => options.MapFrom(u => u.Followers.Count))
                .ForMember(pdto => pdto.Following, options => options.MapFrom(u => u.Followings.Count))
                .ForMember(pdto => pdto.Photo, options => options.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain)!.Url))
                .ForMember(pdto => pdto.IsFollowing, options => options.MapFrom(u => u.Followers.Any(x => x.Observer!.UserName == currentUserName)));

            CreateMap<User, UserLightDto>()
                .ForMember(pdto => pdto.Photo, options => options.MapFrom(u => u.Photos.FirstOrDefault(p => p.IsMain)!.Url));

            CreateMap<UserChat, UserChatDto>()
                .ForMember(ucdto => ucdto.Id, options => options.MapFrom(uc => uc.Id))
                .ForMember(ucdto => ucdto.SentAt, options => options.MapFrom(uc => uc.Sent))
                .ForMember(ucdto => ucdto.UserName, options => options.MapFrom(uc => uc.User!.UserName))
                .ForMember(ucdto => ucdto.DisplayName, options => options.MapFrom(uc => uc.User!.DisplayName))
                .ForMember(ucdto => ucdto.Image, options => options.MapFrom(uc => uc.User!.Photos.FirstOrDefault(p => p.IsMain)!.Url))
                .ForMember(ucdto => ucdto.IsMe, options => options.MapFrom(uc => uc.User!.UserName == currentUserName));

            /// TODO: Rework the 'displayName' field.
            CreateMap<UserChatRoom, UserChatRoomDto>()
                .ForMember(ucrdto => ucrdto.Id, options => options.MapFrom(ucr => ucr.ChatRoomId))
                .ForMember(ucrdto => ucrdto.DisplayName, options => options.MapFrom(ucr => ucr.DisplayName));

            #endregion

            /// Data transfert objects used for writing data.
            #region Command DTOs

            CreateMap<BarCommandDto, Bar>();

            CreateMap<CreatorFieldsDto, CreatorProfiles>();

            CreateMap<EventCategoryCommandDto, EventCategory>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));
            
            CreateMap<EventCommandDto, Event>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ProfileCommandDto, User>()
                .ForMember(pcdto => pcdto.Bio, options => options.MapFrom(pcdto => pcdto.Bio))
                .ForMember(pcdto => pcdto.ColorCode, options => options.MapFrom(pcdto => pcdto.ColorCode))
                .ForMember(pcdto => pcdto.DisplayName, options => options.MapFrom(pcdto => pcdto.DisplayName))
                .ForMember(pcdto => pcdto.IsOpenToMessage, options => options.MapFrom(pcdto => pcdto.IsOpenToMessage))
                .ForMember(pcdto => pcdto.IsPrivate, options => options.MapFrom(pcdto => pcdto.IsPrivate))
                .ForMember(pcdto => pcdto.Location, options => options.MapFrom(pcdto => pcdto.Location))
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventTypeCommandDto, EventType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChallengeTypeCommandDto, ChallengeType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<QuestionTypeCommandDto, QuestionType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ChatRoomTypeCommandDto, ChatRoomType>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<ScheduledEventCommandDto, ScheduledEvent>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventTicketCommandDto, EventTicket>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));

            CreateMap<EventTicket, EventTicketCommandDto>()
                .ForAllMembers(options => options.Condition((src, dest, srcMember) => srcMember is not null));


            #endregion
        }
    }
}
