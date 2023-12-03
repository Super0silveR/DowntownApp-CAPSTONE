using Api.Controllers;
using Application.Core;
using Application.DTOs.Queries;
using Application.Handlers.Events.Queries;
using Application.Params;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Api.Tests.Controllers
{
    public class EventsControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly EventsController _controller;

        public EventsControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new EventsController
            {
                ControllerContext = new ControllerContext()
            };
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;
        }

        [Fact]
        public async Task ShouldGetEvents()
        {
            var mockResult = new Result<PagedList<EventDto>>(); 
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetEvents(new EventParams()); 

            var okResult = result as OkObjectResult;

        }

        [Fact]
        public async Task ShouldGetEvent()
        {
            var eventId = Guid.NewGuid();

            var mockDetailsResult = new Result<EventDto?>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetEvent(eventId);

            var okResult = result as OkObjectResult;
           
        }
    }
}
