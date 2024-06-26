using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PasswordManager.Data;
using PasswordManager.Services;
using PasswordManager.Web.Dto;
using PasswordManager.Web.Dto.LoginDto;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly ILogger<LoginsController> _logger;
        private readonly ILoginService _loginService;

        public LoginsController(ILogger<LoginsController> logger, ILoginService loginService)
        {
            _logger = logger;
            _loginService = loginService;
        }

        [HttpGet("/api/logins")]
        public async Task<IActionResult> GetLogins([FromQuery] Pagination pagination, [FromQuery] string searchTerm)
        {
            var logins = await _loginService.GetAllLogins(pagination.startIndex, pagination.maxRecords, searchTerm);
            if (logins.IsNullOrEmpty())
            {
                return NotFound();
            }
            var loginDtos = logins.Select(login => login.ToLoginDto());
            return Ok(loginDtos);
        }

        [HttpGet("/api/logins/{id}")]
        public async Task<IActionResult> GetLoginById([FromRoute] int id)
        {
            var login = await _loginService.GetLogin(id);
            if (login == null) 
            {
                return NotFound();
            }
            var loginDto = login.ToLoginDto();
            return Ok(loginDto);
        }

        [HttpDelete("/api/logins/{id}")]
        public async Task<IActionResult> DeleteLogin([FromRoute] int id)
        {
            long deletedItemId = await _loginService.DeleteLogin(id);
            if (deletedItemId == 0) 
            {
                return NotFound();
            }
            return Ok(deletedItemId);
        }

        [HttpPut("/api/logins/{id}")]
        public async Task<IActionResult> UpdateLogin([FromRoute] long loginId, [FromBody] LoginDto loginDto)
        {
            if (loginId <= 0)
            {
                return BadRequest();
            }
            var login = await _loginService.UpdateLogin(loginId, loginDto.ToLogin());
            if (login.id == 0)
            {
                return NotFound(login);
            }
            return Ok(login);
        }
        [HttpPut("/api/logins/")]
        public async Task<IActionResult> CreateLogin([FromBody] NewLoginRequest newLogin)
        {
            var login = newLogin.ToLogin();
            await _loginService.CreateLogin(login);
            return CreatedAtAction(nameof(_loginService.CreateLogin), new { id = login.id }, login.ToLoginDto()); 
        }
    }
}
