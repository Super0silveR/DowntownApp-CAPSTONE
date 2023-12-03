using Application.Common.Interfaces;
using CreateCommand = Application.Handlers.Tickets.Commands.Create.Command;
using CreateHandler = Application.Handlers.Tickets.Commands.Create.Handler;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using Moq;
using Application.DTOs.Commands;
using MediatR;
using ApplicationTests.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Enums;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class CreateTicketTest
    {
        /// <summary>
        /// Event Command Data Transfer Object used for creating a new event.
        /// </summary>
        private EventTicketCommandDto _eventTicketCommandDto;

        private readonly IMapper _mapper;

        public CreateTicketTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _mapper = Fixture.Mapper;

            _eventTicketCommandDto = new();
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_CreateEventTicket_ShouldThrowException_ScheduledEventInvalid()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var command = new CreateCommand() { eventTicket = _eventTicketCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper
                );

            /// Returning a valid Guid that doesn't exist in our in-memory context will cause the handler to throw an exception.
            _eventTicketCommandDto.ScheduledEventId = Guid.Empty;

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.False(result.IsSuccess);
            Assert.Equal("This Scheduled Event is invalid", result.Error);
        }

        [Fact]
        public async Task Handle_CreateEvent_ShouldReturnSucess()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var scheduledEvent = context.ScheduledEvents.FirstOrDefault().Id;

            _eventTicketCommandDto = new()
            {
                ScheduledEventId = scheduledEvent,
                Description = "description",
                Price = 0,
                TicketClassification = TicketClassification.Default
            };

            var command = new CreateCommand() { eventTicket = _eventTicketCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper
                );

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);
            Assert.Equal(Unit.Value, result.Value);
        }
    }
}
