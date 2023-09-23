using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace Application.Handlers.EventCategories.Commands
{
    public class Edit
    {
        /// <summary>
        /// Command class used to start the request for editing an EventCategory.
        /// </summary>
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
            public EventCategoryCommandDto EventCategory { get; set; } = new EventCategoryCommandDto();
        }

        /// <summary>
        /// Handler class used to handle the editing of the EventCategory.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(IDataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            /// <summary>
            /// Editing logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Edit.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.EventCategories, nameof(_context.EventCategories));

                var eventCat = await _context.EventCategories.FindAsync(new object?[] { request.Id }, cancellationToken);

                if (eventCat is null) return null;

                _mapper.Map(request.EventCategory, eventCat);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update an EventCategory.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

        /// <summary>
        /// Validator class used for synchronous validation during the process pipeline.
        /// </summary>
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.EventCategory).SetValidator(new EventCategoryCommandDtoValidator());
            }
        }
    }
}
