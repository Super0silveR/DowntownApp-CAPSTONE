using Application.Core;
using ApplicationTests.Data;
using Domain.Entities;
using MediatR;
using CancelCommand = Application.Handlers.Events.Commands.Cancel.Command;
using CancelHandler = Application.Handlers.Events.Commands.Cancel.Handler;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class CancelTest
    {
        public CancelTest(DatabaseFixture fixture) 
        {
            Fixture = fixture;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_CancelEvent_ShouldReturnFailure_EventNotScheduled()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var command = new CancelCommand() { Id = new Guid() };
            var handler = new CancelHandler(context);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.False(result.IsSuccess);
            Assert.Equal("This event is not scheduled.", result.Error);
        }

        [Fact]
        public async Task Handle_CancelEvent_ShouldReturnSuccess_EventCanceled()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var scheduledEvent = context.ScheduledEvents.FirstOrDefault();

            var command = new CancelCommand() { Id = scheduledEvent!.Id };
            var handler = new CancelHandler(context);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);
            Assert.Equal(Unit.Value, result.Value);
            Assert.Null(context.Events.FirstOrDefault(e => e.Id == scheduledEvent!.Id));
            Assert.Equal(1, context.ScheduledEvents.Count()); // We have two (2) in the default db.  //Verify this
        }
    }
}
