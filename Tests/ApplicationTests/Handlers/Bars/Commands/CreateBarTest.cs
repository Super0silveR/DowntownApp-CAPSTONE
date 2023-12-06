using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Commands;
using ApplicationTests.Data;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Moq;
using CreateCommand = Application.Handlers.Bars.Commands.CreateBar.Command;
using CreateHandler = Application.Handlers.Bars.Commands.CreateBar.Handler;

namespace ApplicationTests.Handlers.Bars.Commands
{
    [Collection("db_fixture_collection")]
    public class CreateBarTest
    {
        /// <summary>
        /// Event Command Data Transfer Object used for creating a new event.
        /// </summary>
        private BarCommandDto _barCommandDto;

        private readonly IMapper _mapper;
        private readonly Mock<ICurrentUserService> _userServiceMock;
        private readonly User _currentUser;

        public CreateBarTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _currentUser = Fixture.CurrentUser;
            _mapper = Fixture.Mapper;
            _userServiceMock = Fixture.UserService;

            _barCommandDto = new();
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_CreateBar_ShouldReturnFailure_UserIdInvalid()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();

            var command = new CreateCommand() { Bar = _barCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper,
                _userServiceMock.Object);

            /// Returning an empty string as the userId will cause the handler to return null from invalid Guid parsing.
            _userServiceMock.Setup(x => x.GetUserId()).Returns(string.Empty);

            //Act
            Result<Guid>? result = await handler.Handle(command, CancellationToken.None);

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

            var command = new CreateCommand() { Bar = _barCommandDto };

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
        public async Task Handle_CreateBar_ShouldReturnSucess()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            context.Database.BeginTransaction();



            _barCommandDto = new()
            {
                Title = "New Bar",
                Description = "Description",
                CoverCost = 10.01,
                IsActive = true,
            };

            var command = new CreateCommand() { Bar = _barCommandDto };

            var handler = new CreateHandler(
                context,
                _mapper,
                _userServiceMock.Object);

            /// Returning a valid Guid that exists in our in-memory context will allow the rest of processing.
            _userServiceMock.Setup(x => x.GetUserId()).Returns(_currentUser.Id.ToString());

            //Act
            Result<Guid>? result = await handler.Handle(command, CancellationToken.None);

            context.ChangeTracker.Clear();

            //Assert
            Assert.NotNull(result);
            Assert.True(result.IsSuccess);

            var bar = context.Bars.FirstOrDefault(b => b.Id == result.Value);
            Assert.NotNull(bar);
        }

    }
}
