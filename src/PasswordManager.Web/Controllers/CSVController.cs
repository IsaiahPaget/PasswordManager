using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PasswordManager.Services.CSV;
using PasswordManager.Services.User;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class CSVController : ControllerBase
    {
        private readonly ILogger<LoginsController> _logger;
        private readonly ICSVService _csvService;
        private readonly IUserService _userService;

        public CSVController(ILogger<LoginsController> logger, ICSVService csvService, IUserService userService)
        {
            _logger = logger;
            _csvService = csvService;
            _userService = userService;
        }

        [HttpGet("/api/csv")]
        [Authorize]
        public async Task<IActionResult> ExportCSV() 
        {
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var binaryCSV = await _csvService.Export(user.Id);
            return File(binaryCSV, "application/octet-stream", $"{user.UserName}-{DateTime.Now.ToFileTime()}.csv");
        }

        [HttpPost("/api/csv")]
        [Authorize]
        public async Task<IActionResult> ImportCSV(IFormFile file) 
        {
            if (file == null || file.Length == 0) 
            {
                return BadRequest("No file to upload");
            }

            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            try
            {
                await _csvService.Import(file, user.Id);
                return Ok();
            } catch (Exception ex)
            {
                return StatusCode(500);
            }
        }
    }
}
