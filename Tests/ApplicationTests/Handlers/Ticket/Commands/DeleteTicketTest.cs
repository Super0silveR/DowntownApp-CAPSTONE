
using DeleteCommand = Application.Handlers.Tickets.Commands.Delete.Command;
using DeleteHandler = Application.Handlers.Tickets.Commands.Delete.Handler;
using Application.Core;
using Domain.Entities;
using MediatR;
using ApplicationTests.Data;

namespace ApplicationTests.Handlers.Ticket.Commands
{
    [Collection("db_fixture_collection")]
    public class DeleteTicketTest
    {
        private readonly User _currentUser;

        public DeleteTicketTest(DatabaseFixture fixture)
        {
            Fixture = fixture;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_DeleteTicket_ShouldReturnFailure_TicketDontExist()
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
            Assert.Equal("This ticket does not exist.", result.Error);
        }

        [Fact]
        public async Task Handle_DeleteEvent_ShouldReturnSuccess_EventDeleted()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var eventTicket = context.EventTickets.FirstOrDefault();

            var command = new DeleteCommand() { Id = eventTicket!.Id };
            var handler = new DeleteHandler(context);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);
            Assert.Equal(Unit.Value, result.Value);
            Assert.Null(context.EventTickets.FirstOrDefault(e => e.Id == eventTicket!.Id));
            Assert.Equal(1, context.EventTickets.Count()); // We have two (2) in the default db.
        }
    }
}
