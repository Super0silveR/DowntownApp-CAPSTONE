using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Api.SignalR.Base
{
    public class BaseHub : Hub
    {
        protected readonly IMediator _mediator;

        public BaseHub(IMediator mediator)
        {
            _mediator = mediator;
        }
    }
}
