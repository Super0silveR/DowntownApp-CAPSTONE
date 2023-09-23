using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Persistence.Interceptors
{
    public class UserFollowingSaveChangesInterceptor : SaveChangesInterceptor
    {
        private readonly IDateTimeService _dateTimeService;

        public UserFollowingSaveChangesInterceptor(IDateTimeService dateTimeService)
        {
            _dateTimeService = dateTimeService;
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            UpdateEntities(eventData.Context);

            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        public void UpdateEntities(DbContext? context)
        {
            Guard.Against.Null(context, nameof(context));

            foreach (var entry in context.ChangeTracker.Entries<UserFollowing>())
            {
                if (entry.State == EntityState.Added)
                    entry.Entity.Followed = _dateTimeService.Now;
            }
        }
    }
}
