using Microsoft.AspNetCore.Identity;
using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services.User
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AppUser> GetCurrentUser(ClaimsPrincipal User)
        {
            var username = User.FindFirst(ClaimTypes.GivenName).Value;
            if (username == null)
            {
                return null;
            }
            var user = await _userManager.FindByNameAsync(username);
            return user;
        }
        public async Task<AppUser> UpdateUser(AppUser user)
        {
            await _userManager.UpdateAsync(user);
            return await _userManager.FindByNameAsync(user.UserName);
        }
        public async Task DeleteUser(AppUser user)
        {
            await _userManager.DeleteAsync(user);
        }
    }
}
