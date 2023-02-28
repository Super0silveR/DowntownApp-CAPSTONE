using Api.DTOs.Identity;
using Api.Services;
using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Api.Controllers.Identity
{
    /// <summary>
    /// Controller purposefully different for User Identity Management. 
    /// Identity diff. than business logic, i.e. Business Logic needs authenticated users.
    /// Unauthenticated users are authorized here.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<User> userManager,
                                 ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        /// <summary>
        /// Once authenticated, get the current user.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var emailClaim = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userManager.FindByEmailAsync(emailClaim);

            return await CreateUserObject(user);
        }

        /// <summary>
        /// Loging-in a user.
        /// </summary>
        /// <param name="loginDto">Login data.</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user is null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result)
                return await CreateUserObject(user);
            return Unauthorized();
        }

        /// <summary>
        /// Register a new user.
        /// </summary>
        /// <param name="registerDto">Register data.</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(user => user.UserName == registerDto.UserName))
                return BadRequest("UserName is already taken.");

            var newUser = new User
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (result.Succeeded)
                return await CreateUserObject(newUser);
            return BadRequest(result.Errors);
        }

        /// <summary>
        /// Private util method serving as a mapper
        /// </summary>
        /// <param name="user">User entity.</param>
        /// <returns></returns>
        private async Task<UserDto> CreateUserObject(User user) =>
            new()
            {
                DisplayName = user.DisplayName,
                Photo = null,
                Token = await _tokenService.CreateToken(user),
                UserName = user.UserName
            };
    }
}
