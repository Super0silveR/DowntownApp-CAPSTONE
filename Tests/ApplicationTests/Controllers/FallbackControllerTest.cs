using Api.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.IO;
using Xunit;

namespace Api.Tests.Controllers
{
    public class FallbackControllerTest
    {
        private readonly FallbackController _controller;

        public FallbackControllerTest()
        {
            _controller = new FallbackController();
            _controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext()
            };
        }

        [Fact]
        public void ShouldReturnIndexPhysicalFile()
        {
            // Act
            var result = _controller.Index();

            // Assert
            Assert.IsType<PhysicalFileResult>(result);
            var physicalFileResult = result as PhysicalFileResult;

            Assert.Equal("text/HTML", physicalFileResult.ContentType);

            var expectedPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html");
            Assert.Equal(expectedPath, physicalFileResult.FileName);
        }
    }
}
