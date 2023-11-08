using Xunit;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Api.Controllers.Base;
using Application.Core;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Api.Tests.Controllers
{
    public class BaseApiControllerTest
    {
        private readonly Mock<IMediator> _mediatorMock;
        private readonly TestController _controller;

        public BaseApiControllerTest()
        {
            _mediatorMock = new Mock<IMediator>();
            _controller = new TestController();

            var serviceProviderMock = new Mock<IServiceProvider>();
            serviceProviderMock.Setup(sp => sp.GetService(typeof(IMediator))).Returns(_mediatorMock.Object);

            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    RequestServices = serviceProviderMock.Object
                }
            };
        }

        [Fact]
        public void ShouldHandleResultSuccessfully()
        {
            var result = _controller.TestHandleResult(new Result<string>
            {
                IsSuccess = true,
                Value = "test"
            });

            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public void ShouldHandlePagedResultSuccessfully()
        {
            var pagedResult = new PagedList<string>(new List<string> { "test1", "test2" }, 2, 1, 10);
            var result = _controller.TestHandlePagedResult(new Result<PagedList<string>>
            {
                IsSuccess = true,
                Value = pagedResult
            });

            Assert.IsType<OkObjectResult>(result);
        }

        private class TestController : BaseApiController
        {
            public IActionResult TestHandleResult<T>(Result<T> result) => HandleResult(result);

            public IActionResult TestHandlePagedResult<T>(Result<PagedList<T>> result) => HandlePagedResult(result);
        }
    }
}
