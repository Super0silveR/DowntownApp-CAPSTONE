using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Profiles.Commands
{
    public class CreatorEdit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreatorFieldsDto CreatorFields = new();
        }

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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_context, nameof(_context));
                Guard.Against.Null(_context.Users, nameof(_context.Users));

                var userId = _userService.GetUserId();

                var user = await _context.Users.FirstOrDefaultAsync(cp => cp.Id == Guid.Parse(userId!));

                if (user == null) return Result<Unit>.Failure("This user does not exist.");

                var @profile = await _context.CreatorProfiles.FirstOrDefaultAsync(cp => cp.UserId == Guid.Parse(userId!));

                if (@profile == null) @profile = new CreatorProfiles();

                @profile = _mapper.Map<CreatorProfiles>(request.CreatorFields);

                user.CreatorProfile = profile;

                bool result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure("Failed to update the user's creator fields.");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
