using ScheduledQuery = Application.Handlers.Events.Queries.Scheduled.Query;
using ScheduledHandler = Application.Handlers.Events.Queries.Scheduled.Handler;
using Application.Core;
using Application.DTOs.Queries;
using Application.Params;
using ApplicationTests.Data;
using AutoMapper;

namespace ApplicationTests.Handlers.Events.Queries
{
    [Collection("db_fixture_collection")]
    public class ScheduledEventTest
    {
        private readonly IMapper _mapper;

        public ScheduledEventTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _mapper = Fixture.Mapper;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_ListScheduledEvent_ShouldReturnSuccess_ListedScheduledEventReturned()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var nbrScheduledEvents = context.ScheduledEvents.Count();
            var query = new ScheduledQuery();
            var handler = new ScheduledHandler(
                context,
                _mapper);

            //Act
            Result<List<ScheduledEventDto>> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(nbrScheduledEvents, result.Value.Count);
        }
    }
}
