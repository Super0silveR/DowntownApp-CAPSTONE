using Domain.Common;

namespace Domain.Entities
{
/// <summary>
/// Entity that represents a user's scheduled Zoom meetings.
/// </summary>
public class UserMeetingZoom : BaseEntity
{
  public Guid MeetingId { get; set; }
  public Guid UserId { get; set; }
  public DateTime ScheduledTime { get; set; }
  public string? MeetingLink { get; set; }

  public virtual MeetingZoom? MeetingZoom { get; set; }
  public virtual User? User { get; set; }
   
    }

  } 