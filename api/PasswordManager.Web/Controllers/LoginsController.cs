using Microsoft.AspNetCore.Mvc;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly ILogger<LoginsController> _logger;

        public LoginsController(ILogger<LoginsController> logger)
        {
            _logger = logger;
        }
        [HttpGet("/api/logins")]
        public IActionResult GetLogins()
        {
            return Ok("Hello, world");
        }
        [HttpGet("/api/logins/{id}")]
        public IActionResult GetLoginById([FromRoute] int id)
        {
            return Ok("Hello, world by id");
        }
        [HttpDelete("/api/logins/{id}")]
        public IActionResult DeleteLogin([FromRoute] int id)
        {
            return Ok("Hello, world delete");
        }
        [HttpPut("/api/logins")]
        public IActionResult UpdateLogin([FromBody] int id)
        {
            return Ok("Hello, world update");
        }
    }
}
