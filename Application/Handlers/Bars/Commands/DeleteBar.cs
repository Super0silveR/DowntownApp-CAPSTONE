using Application.Common.Interfaces;
using Application.Core;
using Ardalis.GuardClauses;
using MediatR;

namespace Application.Handlers.Bars.Commands
{
    public class DeleteBar
    {
        /// <summary>
        /// Command class used to start the request for deleting a Bar.
        /// </summary>
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
        }


        /// <summary>
        /// Handler class used to handle the deleting of the bar.
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
                Guard.Against.Null(_context.Bars, nameof(_context.Bars));

                var bar = await _context.Bars.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

                if (bar is null) return Result<Unit>.Failure("This event does not exist.");

                _context.Bars.Remove(bar);

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to delete a bar.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
