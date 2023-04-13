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

namespace Application.Handlers.MeetingZoomTypes.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<MeetingZoomTypeDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<MeetingZoomTypeDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<MeetingZoomTypeDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.MeetingZoomTypes, nameof(_context.MeetingZoomTypes));

                var meetingZoomDto = await _context.MeetingZoomTypes
                                                .ProjectTo<MeetingZoomTypeDto>(_mapper.ConfigurationProvider)
                                                .FirstOrDefaultAsync(ec => ec.Id == request.Id, cancellationToken);

                return Result<MeetingZoomTypeDto?>.Success(meetingZoomDto);
            }
        }
    }
}