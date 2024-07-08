using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services
{
    public interface IUserService
    {
        public Task<AppUser> GetCurrentUser(ClaimsPrincipal user);
    }
}
