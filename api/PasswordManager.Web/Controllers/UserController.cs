using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PasswordManager.Services;
using PasswordManager.Web.Dto.Account;

namespace PasswordManager.Web.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILoginService _loginService;
        public UserController(IUserService userService, ILoginService loginService)
        {
            _userService = userService;
            _loginService = loginService;
        }
        [HttpGet("api/user")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            return Ok(user.ToUserDto());
        }
        [HttpPut("api/user")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUser)
        {
            if (!ModelState.IsValid) {
                return BadRequest();
            }
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            user.Email = updateUser.email;
            user.UserName = updateUser.username;
            var updated = await _userService.UpdateUser(user);
            return Ok(updated.ToUserDto());
        }
        [HttpDelete("api/user")]
        [Authorize]
        public async Task<IActionResult> DeleteUser()
        {
            var user = await _userService.GetCurrentUser(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var logins = await _loginService.GetAllLogins(user.Id);
            if (!logins.IsNullOrEmpty())
            {
                foreach (var login in logins)
                {
                    await _loginService.DeleteLogin(login);
                }
            }
            await _userService.DeleteUser(user);
            return Ok();
        }
    }
}
