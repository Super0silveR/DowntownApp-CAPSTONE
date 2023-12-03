using ScheduledQuery = Application.Handlers.Events.Queries.ScheduledDetails.Query;
using ScheduledHandler = Application.Handlers.Events.Queries.ScheduledDetails.Handler;
using Application.Common.Interfaces;
using Application.Core;
using Application.DTOs.Queries;
using Application.Params;
using ApplicationTests.Data;
using AutoMapper;
using Domain.Entities;
using Moq;

namespace ApplicationTests.Handlers.Events.Queries
{
    [Collection("db_fixture_collection")]
    public class ScheduledDetailsTest
    {
        private readonly IMapper _mapper;

        public ScheduledDetailsTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _mapper = Fixture.Mapper;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_DetailsScheduledEvent_ShouldReturnSuccess_ScheduledEventDetailsReturned()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var scheduledEvent = context.ScheduledEvents.FirstOrDefault()!;
            var query = new ScheduledQuery() { Id = scheduledEvent.Id };
            var handler = new ScheduledHandler(
                context,
                _mapper
                );

            //Act
            Result<ScheduledEventDto?> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(scheduledEvent.Location, result.Value.Location);
        }

        [Fact]
        public async Task Handle_DetailsScheduledEvent_ShouldReturnSuccess_ScheduledEventDetailsNull_IdNonExistent()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var query = new ScheduledQuery() { Id = new Guid() };
            var handler = new ScheduledHandler(
                context,
                _mapper);

            //Act
            Result<ScheduledEventDto?> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.Null(result.Value);
            Assert.True(result.IsSuccess);
        }
    }
}
