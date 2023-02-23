using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System;

namespace Persistence.Interceptors
{
    public class AuditableEntitySaveChangesInterceptor : SaveChangesInterceptor
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTimeService _dateTimeService;

        public AuditableEntitySaveChangesInterceptor(ICurrentUserService currentUserService,
                                                     IDateTimeService dateTimeService)
        {
            _currentUserService = currentUserService;
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

            foreach (var entry in context.ChangeTracker.Entries<BaseAuditableEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedBy = _currentUserService.GetUserId();
                    entry.Entity.Created = _dateTimeService.Now;
                }

                if (entry.State == EntityState.Added || 
                    entry.State == EntityState.Modified ||
                    entry.HasChangedOwnedEntities())
                {
                    entry.Entity.LastModifiedBy = _currentUserService.GetUserId();
                    entry.Entity.LastModified = _dateTimeService.Now;
                }
            }
        }
    }

    public static class Extensions
    {
        public static bool HasChangedOwnedEntities(this EntityEntry entry) =>
            entry.References.Any(reference =>
                reference.TargetEntry != null &&
                reference.TargetEntry.Metadata.IsOwned() &&
                (
                 reference.TargetEntry.State == EntityState.Added || 
                 reference.TargetEntry.State == EntityState.Modified)
                );
    }
}
