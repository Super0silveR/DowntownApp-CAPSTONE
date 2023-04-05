using System;

namespace Application.DTOs.Zoom
{
    public class ZoomMeetingType
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? MeetingIdPrefix { get; set; }
        public string? MeetingPasswordPrefix { get; set; }
        public int Duration { get; set; }
        public int ParticipantsLimit { get; set; }
        public bool AutoRecording { get; set; }
        public bool HostVideoOn { get; set; }
        public bool ParticipantsVideoOn { get; set; }
        public bool AudioOnJoin { get; set; }
        public bool EnableWaitingRoom { get; set; }
        public bool EnableLiveStreaming { get; set; }
        public bool EnableBreakoutRoom { get; set; }
        public bool EnableClosedCaption { get; set; }
    }
}
