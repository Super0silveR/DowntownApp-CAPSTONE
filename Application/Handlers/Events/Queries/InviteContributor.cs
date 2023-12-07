using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Domain.Entities;
using Domain.Enums; 
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;

namespace Application.Handlers.Events.Queries
{
	public class InviteContributor
	{
		public class Command : IRequest<Result<Unit>>
		{
			public string EventId { get; set; }
			public string UserId { get; set; }
		}

		public class Handler : IRequestHandler<Command, Result<Unit>>
		{
			private readonly IDataContext _context;
			public Handler(IDataContext context)
			{
				_context = context;
			}

			public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
			{
				var eventId = Guid.Parse(request.EventId);
				var userId = Guid.Parse(request.UserId);

				var eventEntity = await _context.Events
					.FirstOrDefaultAsync(e => e.Id == eventId, cancellationToken);

				if (eventEntity == null) return Result<Unit>.Failure("Event not found");

				var userEntity = await _context.Users
					.FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

				if (eventEntity == null) return Result<Unit>.Failure("Event not found");

				var contributor = new EventContributor
				{
					Event = eventEntity,
					User = userEntity,
					IsActive = true,
					IsAdmin = false,
					Created = DateTime.UtcNow,
					Status = ContributorStatus.Invited 
				};

				_context.EventContributors.Add(contributor);
				var result = await _context.SaveChangesAsync(cancellationToken) > 0;

				if (!result) return Result<Unit>.Failure("Failed to invite contributor");

				return Result<Unit>.Success(Unit.Value);
			}
		}
	}
}
