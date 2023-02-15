using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IDataContext
    {
        DbSet<Event> Events { get; }
        DbSet<EventAttendee> EventAttendees { get; }

        // overrides
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
