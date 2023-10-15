using DetailsQuery = Application.Handlers.Events.Queries.Details.Query;
using DetailsHandler = Application.Handlers.Events.Queries.Details.Handler;
using ApplicationTests.Data;
using AutoMapper;
using Application.Core;
using Application.Common.Interfaces;
using Moq;
using Application.DTOs.Queries;
using Domain.Entities;

namespace ApplicationTests.Handlers.Events.Queries
{
    [Collection("db_fixture_collection")]
    public class DetailsEventTest
    {
        private readonly User _currentUser;
        private readonly IMapper _mapper;
        private readonly Mock<ICurrentUserService> _userServiceMock;

        public DetailsEventTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _currentUser = Fixture.CurrentUser;
            _mapper = Fixture.Mapper;
            _userServiceMock = new Mock<ICurrentUserService>();

            _userServiceMock.Setup(us => us.GetUserName()).Returns(_currentUser.UserName);
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_DetailsEvent_ShouldReturnSuccess_EventDetailsReturned()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var @event = context.Events.FirstOrDefault()!;
            var query = new DetailsQuery() { Id = @event.Id };
            var handler = new DetailsHandler(
                context, 
                _userServiceMock.Object, 
                _mapper);

            //Act
            Result<EventDto?> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(@event.Title, result.Value.Title);
        }

        [Fact]
        public async Task Handle_DetailsEvent_ShouldReturnSuccess_EventDetailsNull_IdNonExistent()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var query = new DetailsQuery() { Id = new Guid() };
            var handler = new DetailsHandler(
                context,
                _userServiceMock.Object,
                _mapper);

            //Act
            Result<EventDto?> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.Null(result.Value);
            Assert.True(result.IsSuccess);
        }
    }
}
