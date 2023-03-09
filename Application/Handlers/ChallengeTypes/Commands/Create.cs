using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using FluentValidation;
using MediatR;

namespace Application.Handlers.ChallengeTypes.Commands
{
    public class Create
    {
        /// <summary>
        /// Command class used to start the request for creating a new ChallengeType.
        /// </summary>
        public class Command : IRequest<Result<Unit>>
        {
            public ChallengeTypeCommandDto ChallengeType { get; set; } = new ChallengeTypeCommandDto();
        }

        /// <summary>
        /// Handler class used to handle the creation of the new ChallengeType.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ICurrentUserService _userService;
            private readonly IDataContext _context;
            private readonly IMapper _mapper;

            public Handler(ICurrentUserService userService, IDataContext context, IMapper mapper)
            {
                _userService = userService;
                _context = context;
                _mapper = mapper;
            }

            /// <summary>
            /// Creation logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Create.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ChallengeTypes, nameof(_context.ChallengeTypes));
                Guard.Against.Null(request.ChallengeType, nameof(request.ChallengeType));

                var challengeType = _mapper.Map<ChallengeType>(request.ChallengeType);
                challengeType.CreatorId = Guid.Parse(_userService.GetUserId()!);

                _context.ChallengeTypes.Add(challengeType);

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) 
                    return Result<Unit>.Failure("Failed to create a new ChallengeType.");
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
                RuleFor(c => c.ChallengeType).SetValidator(new ChallengeTypeCommandDtoValidator());
            }
        }
    }
}
