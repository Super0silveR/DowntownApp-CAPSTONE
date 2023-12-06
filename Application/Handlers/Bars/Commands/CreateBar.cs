using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Handlers.Bars.Commands
{
    public class CreateBar
    {
        /// <summary>
        /// Command class used to start the request for creating a new Bar.
        /// </summary>
        public class Command : IRequest<Result<Guid>?>
        {
            public BarCommandDto Bar { get; set; } = new BarCommandDto();
        }

        /// <summary>
        /// Handler class used to handle the creation of the new Bar.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Guid>?>
        {
            private readonly IDataContext _context;
            private readonly IMapper _mapper;
            private readonly ICurrentUserService _userService;

            public Handler(IDataContext context, IMapper mapper, ICurrentUserService userService)
            {
                _context = context;
                _mapper = mapper;
                _userService = userService;
            }

            /// <summary>
            /// Creation logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Create.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Guid>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.Bars, nameof(_context.Bars));

                if (!Guid.TryParse(_userService.GetUserId(), out Guid userId)) return Result<Guid>.Failure("This user is invalid.");

                var user = await _context.Users.FindAsync(new object?[] { userId }, cancellationToken);

                if (user is null) throw new Exception("This user is invalid.");

                var bar = _mapper.Map<Bar>(request.Bar);
                bar.CreatorId = user.Id;

                _context.Bars.Add(bar);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Guid>.Failure("Failed to create a new Bar.");
                return Result<Guid>.Success(bar.Id);
            }
        }

        /// <summary>
        /// Validator class used for synchronous validation during the process pipeline.
        /// </summary>
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(x => x.Bar).SetValidator(new BarCommandDtoValidator());
            }
        }
    }
}
