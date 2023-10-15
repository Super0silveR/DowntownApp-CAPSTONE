using Application.Core;
using ApplicationTests.Data;
using Domain.Entities;
using MediatR;
using DeleteCommand = Application.Handlers.Events.Commands.Delete.Command;
using DeleteHandler = Application.Handlers.Events.Commands.Delete.Handler;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class DeleteEventTest
    {
        private readonly User _currentUser;

        public DeleteEventTest(DatabaseFixture fixture)
        {
            Fixture = fixture;
            _currentUser = Fixture.CurrentUser;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_DeleteEvent_ShouldReturnFailure_EventDontExist()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var command = new DeleteCommand() { Id = new Guid() }; /// Random Guid.
            var handler = new DeleteHandler(context);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.False(result.IsSuccess);
            Assert.Equal("This event does not exist.", result.Error);
        }

        [Fact]
        public async Task Handle_DeleteEvent_ShouldReturnSuccess_EventDeleted()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var @event = context.Events.FirstOrDefault(e => e.CreatorId == _currentUser.Id);

            var command = new DeleteCommand() { Id = @event!.Id };
            var handler = new DeleteHandler(context);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);
            Assert.Equal(Unit.Value, result.Value);
            Assert.Null(context.Events.FirstOrDefault(e => e.Id == @event!.Id));
            Assert.Equal(1, context.Events.Count()); // We have two (2) in the default db.
        }
    }
}
