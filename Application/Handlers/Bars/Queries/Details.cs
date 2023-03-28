using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Bars.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<BarDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BarDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<BarDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Bars, nameof(_context.Bars));

                var barDto = await _context.Bars
                                                .ProjectTo<BarDto>(_mapper.ConfigurationProvider)
                                                .FirstOrDefaultAsync(ec => ec.Id == request.Id, cancellationToken);

                return Result<BarDto?>.Success(barDto);
            }
        }
    }
}
