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
            var logins = await _loginService.GetAllLogins(pagination.startIndex, pagination.maxRecords, searchTerm);
            if (logins.IsNullOrEmpty())
            {
                return NotFound();
            }
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }

            var loginDtos = logins
                .Where(login => login.userId == user.Id)
                .Select(login => login.ToLoginDto());

            if (loginDtos.IsNullOrEmpty())
            {
                return NoContent();
            }

            return Ok(loginDtos);
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
                var login = await _loginService.GetLogin(id);
                if (login == null) 
                {
                    return NotFound();
                }
                var user = await _userService.GetCurrentUser(User);
                if (login.userId != user.Id)
                {
                    return Unauthorized();
                }
                var loginDto = login.ToLoginDto();
                return Ok(loginDto);
            }
            catch (Exception ex)
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
            try
            {
                login = await _loginService.GetLogin(id);
            }
            catch (Exception ex)
            {
                return NotFound();
            }

            var user = await _userService.GetCurrentUser(User);
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
            var updatedLogin = await _loginService.UpdateLogin(id, login);
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
