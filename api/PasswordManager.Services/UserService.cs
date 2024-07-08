using Microsoft.AspNetCore.Identity;
using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services
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
    }
}
