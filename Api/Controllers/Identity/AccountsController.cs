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
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public AccountsController(UserManager<User> userManager,
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
            var user = await _userManager.Users
                .Include(u => u.Photos)
                .FirstOrDefaultAsync(u => u.Email == emailClaim);
            
            if (user is null) return NotFound();

            return await CreateUserObject(user);
        }

        /// <summary>
        /// Loging-in a user.
        /// </summary>
        /// <param name="loginDto">Login credentials.</param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(u => u.Photos)
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

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
            {
                ModelState.AddModelError("Username", "Username is already taken.");
                return ValidationProblem(ModelState);
            }
                

            if (await _userManager.Users.AnyAsync(user => user.Email == registerDto.Email)) 
            {
                ModelState.AddModelError("Email", "Email is already taken.");
                return ValidationProblem(ModelState);
            }

            var newUser = new User
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(newUser, registerDto.Password);

            if (result.Succeeded)
                return await CreateUserObject(newUser);
            else {
                foreach (var idError in result.Errors) 
                {
                    ModelState.AddModelError("Error", idError.Description);
                }
                return ValidationProblem(ModelState);
            }
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
                Photo = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                Token = await _tokenService.CreateToken(user),
                UserName = user.UserName
            };
    }
}
