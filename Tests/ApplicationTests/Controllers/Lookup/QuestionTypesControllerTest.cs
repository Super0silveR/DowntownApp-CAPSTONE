using Api.Controllers.Lookup;
using Application.Core;
using Application.DTOs;
using Application.DTOs.Commands;
using Application.DTOs.Queries;
using Application.Handlers.QuestionTypes.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading;
using Xunit;

namespace Api.Tests.Controllers
{
    public class QuestionTypesControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly QuestionTypesController _controller;

        public QuestionTypesControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new QuestionTypesController();
            _controller.ControllerContext = new ControllerContext();
            _controller.ControllerContext.HttpContext = new DefaultHttpContext();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext.HttpContext.RequestServices = serviceProviderMock.Object;
        }

        [Fact]
        public async Task ShouldGetQuestionTypes()
        {
            var mockResult = new Result<List<QuestionTypeDto>>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<List.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockResult);

            var result = await _controller.GetQuestionType();

            var okResult = result as OkObjectResult;

      
        }

        [Fact]
        public async Task ShouldGetQuestionTypeDetails()
        {
            var questionTypeId = Guid.NewGuid();

            var mockDetailsResult = new Result<QuestionTypeDto>();
            _mediatorMock.Setup(m => m.Send(It.IsAny<Details.Query>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mockDetailsResult);

            var result = await _controller.GetQuestionTypeDetails(questionTypeId);

            var okResult = result as OkObjectResult;

        }
    }
}
