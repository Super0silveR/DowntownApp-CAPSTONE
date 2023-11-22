using Xunit;
using Api.Controllers.Error;
using Microsoft.AspNetCore.Mvc;

namespace Api.Tests.Controllers
{
    public class ErrorsControllerTest
    {
        private readonly ErrorsController _controller;

        public ErrorsControllerTest()
        {
            _controller = new ErrorsController();
        }

        [Fact]
        public void ShouldReturnNotFound()
        {
            //var result = _controller.GetNotFound();
        }

        [Fact]
        public void ShouldReturnBadRequest()
        {
            var result = _controller.GetBadRequest();
            var objResult = result as ObjectResult;

            Assert.NotNull(objResult);
            Assert.Equal(400, objResult.StatusCode);
            Assert.Equal("This is a bad request", objResult.Value);
        }

        [Fact]
        public void ShouldThrowServerError()
        {
            Assert.Throws<System.Exception>(() => _controller.GetServerError());
        }

        [Fact]
        public void ShouldReturnUnauthorised()
        {
            //var result = _controller.GetUnauthorised();
        }
    }
}
