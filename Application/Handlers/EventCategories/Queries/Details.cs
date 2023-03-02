using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.EventCategories.Queries
{
    public class Details
    {
        public class Query : IRequest<Result<EventCategoryDto?>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EventCategoryDto?>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<EventCategoryDto?>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventCategories, nameof(_context.EventCategories));

                var categoryDto = await _context.EventCategories
                                                .ProjectTo<EventCategoryDto>(_mapper.ConfigurationProvider)
                                                .FirstOrDefaultAsync(ec => ec.Id == request.Id, cancellationToken);

                return Result<EventCategoryDto?>.Success(categoryDto);
            }
        }
    }
}
