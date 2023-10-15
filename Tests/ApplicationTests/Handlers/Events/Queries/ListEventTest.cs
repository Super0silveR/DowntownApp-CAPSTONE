using ListQuery = Application.Handlers.Events.Queries.List.Query;
using ListHandler = Application.Handlers.Events.Queries.List.Handler;
using Application.Common.Interfaces;
using ApplicationTests.Data;
using AutoMapper;
using Domain.Entities;
using Moq;
using Application.Core;
using Application.DTOs.Queries;
using Application.Params;

namespace ApplicationTests.Handlers.Events.Queries
{
    [Collection("db_fixture_collection")]
    public class ListEventTest
    {
        private readonly User _currentUser;
        private readonly IMapper _mapper;
        private readonly Mock<ICurrentUserService> _userServiceMock;

        public ListEventTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _currentUser = Fixture.CurrentUser;
            _mapper = Fixture.Mapper;
            _userServiceMock = new Mock<ICurrentUserService>();

            _userServiceMock.Setup(us => us.GetUserId()).Returns(_currentUser.Id.ToString());
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_ListEvent_ShouldReturnSuccess_ListedEventReturned_DefaultParams()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var nbrEvents = context.Events.Count();
            var query = new ListQuery { Params = new EventParams() };
            var handler = new ListHandler(
                context,
                _userServiceMock.Object,
                _mapper);

            //Act
            Result<PagedList<EventDto>> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(1, result.Value.CurrentPage);
            Assert.Equal(nbrEvents, result.Value.TotalCount);
        }

        [Fact]
        public async Task Handle_ListEvent_ShouldReturnSuccess_ListedEventReturned_IsGoing_EmptyList()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var query = new ListQuery { Params = new EventParams { IsGoing = true, IsHosting = false } };
            var handler = new ListHandler(
                context,
                _userServiceMock.Object,
                _mapper);

            //Act
            Result<PagedList<EventDto>> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(1, result.Value.CurrentPage);
            Assert.Equal(0, result.Value.TotalCount);
        }

        [Fact]
        public async Task Handle_ListEvent_ShouldReturnSuccess_ListedEventReturned_IsHosting()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var query = new ListQuery { Params = new EventParams { IsGoing = false, IsHosting = true } };
            var handler = new ListHandler(
                context,
                _userServiceMock.Object,
                _mapper);

            //Act
            Result<PagedList<EventDto>> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(1, result.Value.CurrentPage);
            Assert.Equal(2, result.Value.TotalCount);
        }

        [Fact]
        public async Task Handle_ListEvent_ShouldReturnSuccess_ListedEventReturned_DateBetween()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var query = new ListQuery { Params = new EventParams { StartDate = DateTime.UtcNow.AddMonths(3).AddDays(1) } };
            var handler = new ListHandler(
                context,
                _userServiceMock.Object,
                _mapper);

            //Act
            Result<PagedList<EventDto>> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(1, result.Value.TotalCount);
        }
    }
}
