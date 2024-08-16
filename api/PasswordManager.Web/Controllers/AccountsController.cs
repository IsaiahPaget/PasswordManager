using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Any;
using PasswordManager.Data.Models;
using PasswordManager.Services.Account;
using PasswordManager.Services.Mail;
using PasswordManager.Services.Models;
using PasswordManager.Services.User;
using PasswordManager.Web.Dto.Account;
using System.Diagnostics;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ILogger<AccountsController> _logger;
        private readonly IAccountService _accountService;
        private readonly IMailService _mailService;

        public AccountsController(ILogger<AccountsController> logger, IAccountService accountService, IUserService userService, IMailService mailService)
        {
            _logger = logger;
            _accountService = accountService;
            _mailService = mailService;
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
                UserName = authenticationDto.userName,
                Email = authenticationDto.email,
            };

            string token;
            try
            {
                token = await _accountService.AuthenticateUser(appUser, authenticationDto.password);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

            var loggedInUser = new NewUserDto
            {
                Username = authenticationDto.userName,
                Email = authenticationDto.email,
                Token = token,
            };
            var mail = new MailData 
            { 
                recipientEmail = "isaiahpaget@gmail.com",
                subject = "You have mail",
                body = "Hey there"
            };
            try
            {
                _ = _mailService.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

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
