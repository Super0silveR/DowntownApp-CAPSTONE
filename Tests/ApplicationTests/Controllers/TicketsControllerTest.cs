using Api.Controllers;
using Application.Core;
using Application.DTOs.Queries;
using Application.Handlers.Tickets.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Api.Tests.Controllers
{
    public class TicketsControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly TicketsController _controller;

        public TicketsControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new TicketsController
            {
                ControllerContext = new ControllerContext()
            };
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;
        }

        [Fact]
        public async Task ShouldGetTickets()
        {
            var mockResult = new Result<List<EventTicketDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetTickets();

            var okResult = result as OkObjectResult;

        }

        [Fact]
        public async Task ShouldGetEvent()
        {
            var eventId = Guid.NewGuid();

            var mockDetailsResult = new Result<EventTicketDto?>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetTicket(eventId);

            var okResult = result as OkObjectResult;

        }
    }
}
