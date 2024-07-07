using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity;
using PasswordManager.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PasswordManager.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;

        private readonly string _roleName = "User";
        private readonly bool _lockoutOnFailure = false;
        public AccountService(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

        public async Task<string> AuthenticateUser(AppUser appUser, string password)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.NormalizedUserName == appUser.UserName.ToUpper() && x.NormalizedEmail == appUser.Email.ToUpper());
            if (user == null) {
                throw new Exception("Invalid credentials");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, _lockoutOnFailure);
            if (!result.Succeeded)
            {
                throw new Exception("Invalid credentials");
            }

            var token = _tokenService.CreateToken(user);
            return token;
        }

        public async Task<string> CreateUser(AppUser appUser, string password)
        {
            var newUser = await _userManager.CreateAsync(appUser, password);

            if (!newUser.Succeeded)
            {
                throw new Exception(newUser.Errors.ToString());
            }

            var roleResult = await _userManager.AddToRoleAsync(appUser, _roleName);

            if (!roleResult.Succeeded) 
            {
                throw new Exception(roleResult.Errors.ToString());
            }

            var token = _tokenService.CreateToken(appUser);
            return token;
        }

        public async Task<long> DeleteUser(long userId)
        {
            throw new NotImplementedException();
        }

        public async Task<AppUser> GetUser(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<AppUser> UpdateUser(long userId, AppUser appUser)
        {
            throw new NotImplementedException();
        }
    }
}
