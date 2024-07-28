using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PasswordManager.Data.Models;
using PasswordManager.Services;
using PasswordManager.Web.Dto;
using PasswordManager.Web.Dto.LoginDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly ILogger<LoginsController> _logger;
        private readonly ILoginService _loginService;
        private readonly IUserService _userService;

        public LoginsController(ILogger<LoginsController> logger, ILoginService loginService, IUserService userService)
        {
            _logger = logger;
            _loginService = loginService;
            _userService = userService;
        }

        [HttpGet("/api/logins")]
        [Authorize]
        public async Task<IActionResult> GetLogins([FromQuery] Pagination pagination, [FromQuery] string searchTerm)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest();
            }
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var loginsRequest = await _loginService.GetAllLogins(pagination.startIndex, pagination.maxRecords, searchTerm, user.Id);
            if (loginsRequest.logins.IsNullOrEmpty())
            {
                return NoContent();
            }
            var logins = loginsRequest.logins.Select(login => login.ToLoginDto()).ToList();

            var loginsRequestDto = new LoginsRequestDto
            {
                logins = logins,
                rowCount = loginsRequest.rowCount
            };

            return Ok(loginsRequestDto);
        }

        [HttpGet("/api/logins/{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetLoginById([FromRoute] int id)
        {
            if (id < 1) 
            {
                return BadRequest();
            }
            try
            {
                var user = await _userService.GetCurrentUser(User);
                var login = await _loginService.GetLogin(id, user.Id);
                if (login == null) 
                {
                    return NotFound();
                }
                if (login.userId != user.Id)
                {
                    return Unauthorized();
                }
                var loginDto = login.ToLoginDto();
                return Ok(loginDto);
            }
            catch 
            {
                return NotFound();
            }
        }

        [HttpDelete("/api/logins/{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteLogin([FromRoute] int id)
        {
            if (id < 1) 
            {
                return BadRequest();
            }
            Login login;
            var user = await _userService.GetCurrentUser(User);
            try
            {
                login = await _loginService.GetLogin(id, user.Id);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

            if (login.userId != user.Id)
            {
                return Unauthorized();
            }

            try
            {
                await _loginService.DeleteLogin(login);
            }
            catch (Exception ex) 
            {
                return StatusCode(500, ex);
            }

            return Ok(login.id);
        }

        [HttpPut("/api/logins/{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateLogin([FromRoute] long id, [FromBody] UpdateLoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var login = loginDto.ToLogin();
            login.userId = user.Id;
            var updatedLogin = await _loginService.UpdateLogin(id, login, user.Id);
            if (updatedLogin == null)
            {
                return NotFound();
            }
            return Ok(loginDto);
        }
        [HttpPost("/api/logins")]
        [Authorize]
        public async Task<IActionResult> CreateLogin([FromBody] NewLoginRequest newLogin)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest();
            }
            var username = User.FindFirst(ClaimTypes.GivenName).Value;
            if (username == null)
            {
                return BadRequest();
            }
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return BadRequest();
            }
            var login = newLogin.ToLogin();
            login.userId = user.Id;
            await _loginService.CreateLogin(login);
            return CreatedAtAction(nameof(_loginService.CreateLogin), new { id = login.id }, login.ToLoginDto()); 
        }
    }
}
