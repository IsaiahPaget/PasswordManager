using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services.User
{
    public interface IUserService
    {
        public Task<AppUser> GetCurrentUser(ClaimsPrincipal user);
        public Task<AppUser> UpdateUser(AppUser user);
        public Task DeleteUser(AppUser user);
    }
}
