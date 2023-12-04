using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Tickets.Queries
{
    public class List
    {
        public class Query : IRequest<Result<List<EventTicketDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<EventTicketDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<EventTicketDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventTickets, nameof(_context.EventTickets));

                var eventTicketDtos = await _context.EventTickets
                                                  .ProjectTo<EventTicketDto>(_mapper.ConfigurationProvider)
                                                  .ToListAsync(cancellationToken);

                return Result<List<EventTicketDto>>.Success(eventTicketDtos);
            }
        }
    }
}
