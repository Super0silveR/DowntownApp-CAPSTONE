﻿using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Ardalis.GuardClauses;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.EventCategories.Queries
{
    /// <summary>
    /// Class that serves as the base for fetching a list of EventCategories.
    /// </summary>
    public class List
    {
        /// <summary>
        /// Class that serves as the Query for indicating the mediator action.
        /// </summary>
        public class Query : IRequest<Result<List<EventCategoryDto>>> { }

        /// <summary>
        /// Class that serves as the Handler for the Query.
        /// </summary>
        public class Handler : IRequestHandler<Query, Result<List<EventCategoryDto>>>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<EventCategoryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventCategories, nameof(_context.EventCategories));

                var categoriesDto = await _context.EventCategories
                                                  .ProjectTo<EventCategoryDto>(_mapper.ConfigurationProvider)
                                                  .ToListAsync(cancellationToken);

                return Result<List<EventCategoryDto>>.Success(categoriesDto);
            }
        }
    }
}
