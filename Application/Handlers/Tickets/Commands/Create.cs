using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using Ardalis.GuardClauses;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Handlers.Tickets.Commands
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public EventTicketCommandDto eventTicket { get; set; } = new EventTicketCommandDto();
        }

        public class Handler : IRequestHandler<Command, Result<Unit>?>
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

            public Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                throw new NotImplementedException();
            }
        }
    }
}
