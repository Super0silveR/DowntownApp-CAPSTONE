using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Tickets.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<EventTicketDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EventTicketDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<EventTicketDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventTickets, nameof(_context.EventTickets));

                var eventTicketDto = await _context.EventTickets
                                           .ProjectTo<EventTicketDto>(_mapper.ConfigurationProvider)
                                           .FirstOrDefaultAsync(edto => edto.Id == request.Id);

                return Result<EventTicketDto?>.Success(eventTicketDto);
            }
        }
    }
}
