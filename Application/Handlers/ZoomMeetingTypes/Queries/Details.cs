using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.ZoomMeetingTypes.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<ZoomMeetingTypeDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ZoomMeetingTypeDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ZoomMeetingTypeDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ZoomMeetingTypes, nameof(_context.ZoomMeetingTypes));

                var zoomMeetingDto = await _context.ZoomMeetingTypes
                                                .ProjectTo<ZoomMeetingTypeDto>(_mapper.ConfigurationProvider)
                                                .FirstOrDefaultAsync(ec => ec.Id == request.Id, cancellationToken);

                return Result<ZoomMeetingTypeDto?>.Success(zoomMeetingDto);
            }
        }
    }
}
