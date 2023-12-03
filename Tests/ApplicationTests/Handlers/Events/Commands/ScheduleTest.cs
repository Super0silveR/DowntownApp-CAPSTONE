using Application.Common.Interfaces;
using CreateCommand = Application.Handlers.Events.Commands.Schedule.Command;
using CreateHandler = Application.Handlers.Events.Commands.Schedule.Handler;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using Moq;
using Application.DTOs.Commands;
using MediatR;
using ApplicationTests.Data;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class ScheduleTest
    {
        /// <summary>
        /// ScheduledEvent Command Data Transfer Object used for Scheduling an Event.
        /// </summary>
        private ScheduledEventCommandDto _scheduledEventDto;

        private readonly IMapper _mapper;
        private Bar _currentBar;
        private Event _currentEvent;

        public ScheduleTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _mapper = Fixture.Mapper;

            _scheduledEventDto = new();
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_ScheduleEvent_ShouldThrowException_BarInvalid()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var command = new CreateCommand() { ScheduledEvent = _scheduledEventDto };

            var handler = new CreateHandler(
                context,
                _mapper
                );

            /// Returning a valid Guid that doesn't exist in our in-memory context will cause the handler to throw an exception.
            _scheduledEventDto.BarId = Guid.Empty;
            _scheduledEventDto.EventId = context.Events.FirstOrDefault().Id;

            //Act
            Func<Task> handleCreate = () => handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(() => handleCreate());
            Assert.Equal("This bar is invalid.", exception.Message);
        }

        [Fact]
        public async Task Handle_ScheduleEvent_ShouldThrowException_EventInvalid()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var command = new CreateCommand() { ScheduledEvent = _scheduledEventDto };

            var handler = new CreateHandler(
                context,
                _mapper
                );

            /// Returning a valid Guid that doesn't exist in our in-memory context will cause the handler to throw an exception.
            _scheduledEventDto.EventId = Guid.Empty;
            _scheduledEventDto.BarId = context.Bars.FirstOrDefault().Id;

            //Act
            Func<Task> handleCreate = () => handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(() => handleCreate());
            Assert.Equal("This event is invalid.", exception.Message);
        }

        [Fact]
        public async Task Handle_ScheduleEvent_ShouldReturnSucess()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var bar = context.Bars.FirstOrDefault();
            var @event = context.Events.FirstOrDefault();

            _scheduledEventDto = new()
            {
                BarId = bar.Id,
                EventId = @event.Id,
                Scheduled = DateTime.Now,
                Location = "Test",
                Capacity = 0,
                Guidelines = "Test"
            };

            var command = new CreateCommand() { ScheduledEvent = _scheduledEventDto };

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
