using Domain.Common;
using MediatR;

namespace Persistence.Common
{
    public static class MediatorExtensions
    {
        public static async Task DispatchDomainEvents(this IMediator mediator, DataContext dataContext)
        {
            var entities = dataContext.ChangeTracker
                                      .Entries<BaseEntity>()
                                      .Where(e => e.Entity.DomainEvents.Any())
                                      .Select(e => e.Entity);

            var domainEvents = entities.SelectMany(e => e.DomainEvents)
                                       .ToList();

            entities.ToList().ForEach(e => e.ClearDomainEvents());

            foreach (var domainEvent in domainEvents)
                await mediator.Publish(domainEvent);
        }
    }
}