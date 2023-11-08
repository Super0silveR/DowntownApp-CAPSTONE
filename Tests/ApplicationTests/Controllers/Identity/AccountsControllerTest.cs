//using Xunit;
//using Moq;
//using Moq.EntityFrameworkCore;
//using Microsoft.AspNetCore.Mvc;
//using Api.Controllers.Identity;
//using Api.DTOs.Identity;
//using Microsoft.AspNetCore.Identity;
//using System.Linq;
//using System.Threading.Tasks;
//using System.Collections.Generic;
//using Application.Common.Interfaces;
//using Domain.Entities;

//namespace ApplicationTests.Controllers.Identity
//{
//    public class AccountsControllerTest
//    {
//        private readonly Mock<UserManager<User>> _mockUserManager;
//        private readonly Mock<ITokenService> _mockTokenService;

//        public AccountsControllerTest()
//        {
//            var userStoreMock = new Mock<IUserStore<User>>();
//            _mockUserManager = new Mock<UserManager<User>>(
//                userStoreMock.Object, null, null, null, null, null, null, null, null);
//        }

//        [Fact]
//        public async Task Login_ValidCredentials_ReturnsUserDto()
//        {
//            // Arrange
//            var loginDto = new LoginDto
//            {
//                Email = "test@test.com",
//                Password = "Test123!"
//            };
//            var testUser = new User { Email = loginDto.Email, UserName = "testUser", Photos = new List<UserPhoto>() };

//            var users = new List<User> { testUser }.AsQueryable();
//            _mockUserManager.Setup(x => x.Users).Returns(users);

//            _mockUserManager.Setup(x => x.CheckPasswordAsync(testUser, loginDto.Password))
//                .ReturnsAsync(true);


//            // Act
//            //var result = await controller.Login(loginDto);

//            // Assert
//            var okResult = Assert.IsType<OkObjectResult>(result.Result);
//            var returnValue = Assert.IsType<UserDto>(okResult.Value);
//            Assert.Equal("testUser", returnValue.UserName);
//            Assert.Equal("fakeTokenString", returnValue.Token);
//        }
//    }
//}
