using Application.Core;
using ApplicationTests.Data;
using Domain.Entities;
using MediatR;
using DeleteCommand = Application.Handlers.Bars.Commands.DeleteBar.Command;
using DeleteHandler = Application.Handlers.Bars.Commands.DeleteBar.Handler;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class DeleteBarTest
    {
        private readonly User _currentUser;

        public DeleteBarTest(DatabaseFixture fixture)
        {
            Fixture = fixture;
            _currentUser = Fixture.CurrentUser;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_DeleteBar_ShouldReturnFailure_BarDontExist()
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
        public async Task Handle_DeleteBar_ShouldReturnSuccess_BarDeleted()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var bar = context.Bars.FirstOrDefault();

            var command = new DeleteCommand() { Id = bar!.Id };
            var handler = new DeleteHandler(context);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);
            Assert.Equal(Unit.Value, result.Value);
            Assert.Null(context.Bars.FirstOrDefault(e => e.Id == bar!.Id));
            Assert.Equal(1, context.Bars.Count()); // We have two (2) in the default db.
        }
    }
}
