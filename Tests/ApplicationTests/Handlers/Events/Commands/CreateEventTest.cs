using Application.Common.Interfaces;
using CreateCommand = Application.Handlers.Events.Commands.Create.Command;
using CreateHandler = Application.Handlers.Events.Commands.Create.Handler;
using Application.Core;
using AutoMapper;
using Domain.Entities;
using Moq;
using Application.DTOs.Commands;
using MediatR;
using ApplicationTests.Data;
using Microsoft.EntityFrameworkCore;

namespace ApplicationTests.Handlers.Events.Commands
{
    [Collection("db_fixture_collection")]
    public class CreateEventTest
    {
        /// <summary>
        /// Event Command Data Transfer Object used for creating a new event.
        /// </summary>
        private EventCommandDto _eventCommandDto;

        private readonly IMapper _mapper;
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly User _currentUser;

        public CreateEventTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _currentUser = Fixture.CurrentUser;
            _mapper = Fixture.Mapper;
            _userServiceMock = Fixture.UserService;

            _eventCommandDto = new();
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_CreateEvent_ShouldReturnFailure_UserIdInvalid()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var command = new CreateCommand() { Event = _eventCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper,
                _userServiceMock.Object);

            /// Returning an empty string as the userId will cause the handler to return null from invalid Guid parsing.
            _userServiceMock.Setup(x => x.GetUserId()).Returns(string.Empty);

            //Act
            Result<Unit>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.False(result.IsSuccess);
            Assert.Equal("This user is invalid.", result.Error);
        }

        [Fact]
        public async Task Handle_CreateEvent_ShouldThrowException_UserInvalid()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var command = new CreateCommand() { Event = _eventCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper,
                _userServiceMock.Object);

            /// Returning a valid Guid that doesn't exist in our in-memory context will cause the handler to throw an exception.
            _userServiceMock.Setup(x => x.GetUserId()).Returns(new Guid().ToString());

            //Act
            Func<Task> handleCreate = () => handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            var exception = await Assert.ThrowsAsync<Exception>(() => handleCreate());
            Assert.Equal("This user is invalid.", exception.Message);
        }

        [Fact]
        public async Task Handle_CreateEvent_ShouldThrowDatabaseException_ForeignKeyCategory()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var type = context.EventTypes.FirstOrDefault(ec => ec.CreatorId == _currentUser.Id);

            _eventCommandDto = new()
            {
                Date = DateTime.UtcNow,
                Description = "Create Event Test",
                EventCategoryId = new Guid(), /// Foreign Kety Constraint.
                EventTypeId = type!.Id,
                Title = "Test"
            };

            var command = new CreateCommand() { Event = _eventCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper,
                _userServiceMock.Object);

            /// Returning a valid Guid that doesn't exist in our in-memory context will cause the handler to throw an exception.
            _userServiceMock.Setup(x => x.GetUserId()).Returns(_currentUser.Id.ToString());

            //Act
            Func<Task> handleCreate = () => handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            var exception = await Assert.ThrowsAsync<DbUpdateException>(() => handleCreate());
        }

        [Fact]
        public async Task Handle_CreateEvent_ShouldReturnSucess()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var category = context.EventCategories.FirstOrDefault(ec => ec.CreatorId == _currentUser.Id);
            var type = context.EventTypes.FirstOrDefault(ec => ec.CreatorId == _currentUser.Id);

            _eventCommandDto = new()
            {
                Date = DateTime.UtcNow,
                Description = "Create Event Test",
                EventCategoryId = category!.Id,
                EventTypeId = type!.Id,
                Title = "Test"
            };

            var command = new CreateCommand() { Event = _eventCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper,
                _userServiceMock.Object);

            /// Returning a valid Guid that exists in our in-memory context will allow the rest of processing.
            _userServiceMock.Setup(x => x.GetUserId()).Returns(_currentUser.Id.ToString());

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
