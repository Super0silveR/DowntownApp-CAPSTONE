using Domain.Events.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Diagnostics.CodeAnalysis;

namespace Application.Handlers.Events.EventHandlers
{
    /// <summary>
    /// This is really not used right now, but was a proof of concept on domain event notification. 
    /// </summary>
    [ExcludeFromCodeCoverage]
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
