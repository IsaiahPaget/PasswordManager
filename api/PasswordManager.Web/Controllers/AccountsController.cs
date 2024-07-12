using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using PasswordManager.Data.Models;
using PasswordManager.Services;
using PasswordManager.Web.Dto.Account;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ILogger<AccountsController> _logger;
        private readonly IAccountService _accountService;

        public AccountsController(ILogger<AccountsController> logger, IAccountService accountService)
        {
            _logger = logger;
            _accountService = accountService;
        }
        [HttpPost("api/login")]
        public async Task<IActionResult> Login(AuthenticationRequestDto authenticationDto)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            var appUser = new AppUser
            {
                UserName = authenticationDto.Username,
                Email = authenticationDto.Email,
            };

            string token;
            try
            {
                token = await _accountService.AuthenticateUser(appUser, authenticationDto.Password);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

            var loggedInUser = new NewUserDto
            {
                Username = authenticationDto.Username,
                Email = authenticationDto.Email,
                Token = token,
            };

            return Ok(loggedInUser);
        }

        [HttpPost("api/register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            var appUser = new AppUser
            {
                UserName = registerDto.userName,
                Email = registerDto.email
            };

            string token;

            try {
                token = await _accountService.CreateUser(appUser, registerDto.password);
            }
            catch (Exception e) {
                return StatusCode(500, e);
            }

            var newUser = new NewUserDto
            {
                Username = registerDto.userName,
                Email = registerDto.email,
                Token = token,
            };

            return Ok(newUser);
        }
    }
}
