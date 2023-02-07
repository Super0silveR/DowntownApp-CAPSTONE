using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.Events
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Event? Event { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(DataContext dataContext, IMapper mapper)
            {
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Events, nameof(_dataContext.Events));
                Guard.Against.Null(request.Event, nameof(request.Event));

                var @event = await _dataContext.Events.FindAsync(request.Event.Id);

                if (@event is null) throw new Exception();

                _mapper.Map(request.Event, @event);

                await _dataContext.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
