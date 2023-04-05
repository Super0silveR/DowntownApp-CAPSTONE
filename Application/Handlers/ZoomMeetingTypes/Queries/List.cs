using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handlers.ZoomMeetingTypes.Queries
{
    public class List
    {
        public class Query : IRequest<Result<List<ZoomMeetingTypeDto>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<ZoomMeetingTypeDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ZoomMeetingTypeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ZoomMeetingTypes, nameof(_context.ZoomMeetingTypes));

                var zoomMeetingTypes = await _context.ZoomMeetingTypes.ToListAsync(cancellationToken);
                var zoomMeetingTypeDto = _mapper.Map<List<ZoomMeetingTypeDto>>(zoomMeetingTypes);

                return Result<List<ZoomMeetingTypeDto>>.Success(zoomMeetingTypeDto);
            }
        }
    }
}
