using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.MeetingZoomTypes.Queries
{
    /// <summary>
    /// Class that serves as the base for fetching a list of MeetingZoomTypes.
    /// </summary>
    public class List
    {
        /// <summary>
        /// Class that serves as the Query for indicating the mediator action.
        /// </summary>
        public class Query : IRequest<Result<List<MeetingZoomTypeDto>>> { }

        /// <summary>
        /// Class that serves as the Handler for the Query.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<List<MeetingZoomTypeDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<MeetingZoomTypeDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.MeetingZoomTypes, nameof(_context.MeetingZoomTypes));

                var meetingZoomTypes = await _context.meetingZoomTypes.ToListAsync(cancellationToken);
                var meetingZoomTypeDto = _mapper.Map<List<MeetingZoomTypeDto>>(meetingZoomTypes);

                return Result<List<MeetingZoomTypeDto>>.Success(meetingZoomTypeDto);
            }
        }
    }
}