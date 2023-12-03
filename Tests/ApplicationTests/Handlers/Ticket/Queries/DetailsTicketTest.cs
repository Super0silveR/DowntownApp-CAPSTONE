using DetailsQuery = Application.Handlers.Tickets.Queries.Details.Query;
using DetailsHandler = Application.Handlers.Tickets.Queries.Details.Handler;
using Application.Common.Interfaces;
using ApplicationTests.Data;
using AutoMapper;
using Domain.Entities;
using Moq;
using Application.Core;
using Application.DTOs.Queries;
using Application.Params;


namespace ApplicationTests.Handlers.Ticket.Queries
{
    [Collection("db_fixture_collection")]
    public class DetailsTicketTest
    {
        private readonly IMapper _mapper;

        public DetailsTicketTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _mapper = Fixture.Mapper;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_DetailsEvent_ShouldReturnSuccess_EventDetailsReturned()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var eventTicket = context.EventTickets.FirstOrDefault()!;
            var query = new DetailsQuery() { Id = eventTicket.Id };
            var handler = new DetailsHandler(
                context,
                _mapper);

            //Act
            Result<EventTicketDto?> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(eventTicket.Id, result.Value.Id);
        }

        [Fact]
        public async Task Handle_DetailsEvent_ShouldReturnSuccess_EventDetailsNull_IdNonExistent()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var query = new DetailsQuery() { Id = new Guid() };
            var handler = new DetailsHandler(
                context,
                _mapper);

            //Act
            Result<EventTicketDto?> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.Null(result.Value);
            Assert.True(result.IsSuccess);
        }
    }
}
