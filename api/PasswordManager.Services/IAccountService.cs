using PasswordManager.Data.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services
{
    public interface IAccountService
    {
        public Task<string> CreateUser(AppUser appUser, string password);
        public Task<AppUser> GetUser(long id);
        public Task<AppUser> UpdateUser(long userId, AppUser appUser);
        public Task<long> DeleteUser(long userId);
        public Task<string> AuthenticateUser(AppUser appUser, string password);
    }
}
