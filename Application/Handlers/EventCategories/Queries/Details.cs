using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Ardalis.GuardClauses;
using AutoMapper;
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

                EventCategory? eventCategory = await _context.EventCategories.FirstOrDefaultAsync(ec => ec.Id == request.Id, cancellationToken);
                var categoryDto = _mapper.Map<EventCategoryDto>(eventCategory);

                return Result<EventCategoryDto?>.Success(categoryDto);
            }
        }
    }
}
