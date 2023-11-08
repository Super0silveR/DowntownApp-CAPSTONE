using Api.Controllers.Lookup;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Application.Handlers.ChatRoomTypes.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading;
using Xunit;

namespace ControllersTests.Lookup
{
    public class ChatRoomTypesControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly ChatRoomTypesController _controller;

        public ChatRoomTypesControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new ChatRoomTypesController();
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;
        }

        [Fact]
        public async Task ShouldGetChatRoomTypes()
        {
            var mockResult = new Result<List<ChatRoomTypeDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetChatRoomTypes();

            var okResult = result as OkObjectResult;

           
        }

        [Fact]
        public async Task ShouldGetChatRoomTypeDetails()
        {
            var chatRoomTypeId = Guid.NewGuid();

            var mockDetailsResult = new Result<ChatRoomTypeDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetChatRoomTypeDetails(chatRoomTypeId);

            var okResult = result as OkObjectResult;

        }
    }
}
