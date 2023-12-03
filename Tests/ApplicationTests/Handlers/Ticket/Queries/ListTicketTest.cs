using Application.Core;
using Application.DTOs.Queries;
using Application.Params;
using ApplicationTests.Data;
using AutoMapper;
using ListQuery = Application.Handlers.Tickets.Queries.List.Query;
using ListHandler = Application.Handlers.Tickets.Queries.List.Handler;

namespace ApplicationTests.Handlers.Ticket.Queries
{
    [Collection("db_fixture_collection")]
    public class ListTicketTest
    {
        private readonly IMapper _mapper;

        public ListTicketTest(DatabaseFixture fixture)
        {
            Fixture = fixture;

            _mapper = Fixture.Mapper;
        }

        public DatabaseFixture Fixture { get; }

        [Fact]
        public async Task Handle_ListEventTickets_ShouldReturnSuccess_ListedEventTicketsReturned()
        {
            //Arrange
            using var context = Fixture.CreateContext();

            var nbrEventTickets = context.EventTickets.Count();
            var query = new ListQuery();
            var handler = new ListHandler(
                context,
                _mapper);

            //Act
            Result<List<EventTicketDto>> result = await handler.Handle(query, CancellationToken.None);

            //Assert
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(result.IsSuccess);
            Assert.Equal(nbrEventTickets, result.Value.Count);
        }
    }
}
