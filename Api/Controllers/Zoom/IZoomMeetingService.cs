using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.Interfaces
{
    public interface IZoomMeetingService
    {
        Task<ZoomMeetingDto> GetMeeting(Guid id);
        Task<List<ZoomMeetingDto>> GetMeetings();
        Task<Guid> CreateMeeting(ZoomMeetingDto zoomMeetingDto);
        Task UpdateMeeting(Guid id, ZoomMeetingDto zoomMeetingDto);
        Task DeleteMeeting(Guid id);
    }
}
