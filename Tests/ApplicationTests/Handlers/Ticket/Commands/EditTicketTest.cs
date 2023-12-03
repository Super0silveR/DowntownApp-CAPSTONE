using Application.Common.Interfaces;
using EditCommand = Application.Handlers.Tickets.Commands.Edit.Command;
using EditHandler = Application.Handlers.Tickets.Commands.Edit.Handler;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using Moq;
using Application.DTOs.Commands;
using MediatR;
using ApplicationTests.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Enums;

namespace ApplicationTests.Handlers.Ticket.Commands
{
    [Collection("db_fixture_collection")]
    public class EditTicketTest
    {
        private readonly IMapper _mapper;

        private EventTicketCommandDto _commandDto;

        public EditTicketTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _commandDto = new EventTicketCommandDto();
            _mapper = Fixture.Mapper;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_EditEvent_ShouldReturnFailure_EventDontExist()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var command = new EditCommand()
            {
                Id = new Guid()
            };
            var handler = new EditHandler(context, _mapper);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.False(result.IsSuccess);
            Assert.Equal("This Ticket does not exist.", result.Error);
        }

        [Fact]
        public async Task Handle_EditEvent_ShouldThrowDbException_ForeignKeyCategory()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var eventTicket = context.EventTickets.First();
            var ticketId = eventTicket.Id;

            var command = new EditCommand()
            {
                Id = ticketId,
                eventTicket = new EventTicketCommandDto
                {
                    ScheduledEventId = Guid.NewGuid(),
                }
            };
            var handler = new EditHandler(context, _mapper);

            //Act
            Func<Task> handleEdit = () => handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            DbUpdateException exception = await Assert.ThrowsAsync<DbUpdateException>(() => handleEdit());
            Assert.Contains("FOREIGN KEY", exception.InnerException?.Message);
        }

        [Fact]
        public async Task Handle_EditEvent_ShouldReturnSuccess_EventEdited()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var eventTicket = context.EventTickets.FirstOrDefault();
            var ticketId = eventTicket!.Id;

            var command = new EditCommand()
            {
                Id = ticketId,
                eventTicket = new EventTicketCommandDto
                {
                    Price= 999999
                }
            };
            var handler = new EditHandler(context, _mapper);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);
            Assert.Equal(Unit.Value, result.Value);
            Assert.Equal(999999, eventTicket.Price);
        }
    }
}
