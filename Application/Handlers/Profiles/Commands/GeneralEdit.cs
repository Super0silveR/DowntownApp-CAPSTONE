using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Application.Validators;
using Ardalis.GuardClauses;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;

namespace Application.Handlers.Profiles.Commands
{
    public class GeneralEdit
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public ProfileCommandDto Profile = new();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
        {
            private readonly ICurrentUserService _userService;
            private readonly IDataContext _dataContext;
            private readonly IMapper _mapper;

            public Handler(ICurrentUserService userService, IDataContext dataContext, IMapper mapper)
            {
                _userService = userService;
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Guard.Against.Null(_dataContext.Users, nameof(_dataContext.Users));

                var currentUserName = _userService.GetUserName();
                var @profile = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserName == currentUserName, 
                                                                            cancellationToken);

                if (@profile == null) return null;

                _mapper.Map(request.Profile, profile);

                bool result = await _dataContext.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                    return Result<Unit>.Failure($"Failed to update {currentUserName}'s profile information.");
                return Result<Unit>.Success(Unit.Value);
            }
        }

        /// <summary>
        /// Integrate our custom validator to the data pushed to our RequestHandler.
        /// </summary>
        public class Validator : AbstractValidator<Command>
        {
            public Validator()
            {
                RuleFor(c => c.Profile).SetValidator(new ProfileCommandDtoValidator());
            }
        }
    }
}
