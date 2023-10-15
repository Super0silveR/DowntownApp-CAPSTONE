using Application.Core;
using Application.DTOs.Commands;
using ApplicationTests.Data;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using EditCommand = Application.Handlers.Events.Commands.Edit.Command;
using EditHandler = Application.Handlers.Events.Commands.Edit.Handler;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class EditEventTest
    {
        private readonly User _currentUser;
        private readonly IMapper _mapper;

        private EventCommandDto _commandDto;

        public EditEventTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _commandDto = new EventCommandDto();
            _currentUser = Fixture.CurrentUser;
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
                Id = new Guid(),
                Event = _commandDto /// Default CTOR, doesn't matter here.
            };
            var handler = new EditHandler(context, _mapper);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.False(result.IsSuccess);
            Assert.Equal("This event does not exist.", result.Error);
        }

        [Fact]
        public async Task Handle_EditEvent_ShouldThrowDbException_ForeignKeyCategory()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var @event = context.Events.First(e => e.CreatorId == _currentUser.Id);
            var eventId = @event.Id;
            var typeId = @event.EventTypeId;

            var command = new EditCommand()
            {
                Id = eventId,
                Event = new EventCommandDto
                {
                    Title = "Title",
                    EventCategoryId = Guid.NewGuid(),
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
        public async Task Handle_EditEvent_ShouldThrowDbException_ForeignKeyType()
        {
            //Arrange
            using var context = Fixture.CreateContext();
            context.Database.BeginTransaction();

            var @event = context.Events.First(e => e.CreatorId == _currentUser.Id);
            var eventId = @event.Id;

            var command = new EditCommand()
            {
                Id = eventId,
                Event = new EventCommandDto
                {
                    Title = "Title",
                    EventTypeId = Guid.NewGuid()
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

            var @event = context.Events.FirstOrDefault(e => e.CreatorId == _currentUser.Id);
            var eventId = @event!.Id;

            var command = new EditCommand()
            {
                Id = eventId,
                Event = new EventCommandDto
                {
                    Title = "Title Only Edited",
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
            Assert.Equal("Title Only Edited", @event.Title);
        }
    }
}
