using Domain.Events.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Handlers.Events.EventHandlers
{
    public class CreatedEventHandler : INotificationHandler<CreatedEvent>
    {
        private readonly ILogger<CreatedEventHandler> _logger;

        public CreatedEventHandler(ILogger<CreatedEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(CreatedEvent notification, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Created event: {notification}");

            return Task.CompletedTask;
        }
    }
}
