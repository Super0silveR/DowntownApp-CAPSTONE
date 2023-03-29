using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using MediatR;

namespace Application.Handlers.ChallengeTypes.Commands
{
    public class Delete
    {
        /// <summary>
        /// Command class used to start the request for deleting an ChallengeType.
        /// </summary>
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
        }


        /// <summary>
        /// Handler class used to handle the deleting of the ChallengeType.
        /// </summary>
        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly IDataContext _context;

            public Handler(IDataContext context)
            {
                _context = context;
            }


            /// <summary>
            /// Deleting logic handled.
            /// </summary>
            /// <param name="request">IRequest object, i.e. Delete.Command</param>
            /// <param name="cancellationToken"></param>
            /// <returns>Result<Unit></returns>
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context.ChallengeTypes, nameof(_context.ChallengeTypes));

                var challengeType = await _context.ChallengeTypes.FindAsync(new object?[] { request.Id }, cancellationToken);

                if (challengeType is null) return null;

                _context.ChallengeTypes.Remove(challengeType);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to delete an ChallengeType.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
