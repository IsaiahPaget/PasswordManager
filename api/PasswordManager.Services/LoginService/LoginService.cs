using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using PasswordManager.Data.Models;
using PasswordManager.Services.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services.LoginService
{
    public class LoginService : ILoginService
    {
        private readonly ApplicationDbContext _db;
        public LoginService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<Login>> GetAllLogins(string userId)
        {
            var results = await _db.Logins
                .Where(login => login.userId == userId)
                .ToListAsync();

            return results;
        }
        public async Task<LoginsRequest> GetAllLogins(int startIndex, int maxRecords, string searchTerm, string userId)
        {
            var results = _db.Logins
                .Where(login => login.userId == userId)
                .Where(login => searchTerm == "\u0002\u0003" ||
                    login.username.Contains(searchTerm) ||
                    login.url.Contains(searchTerm) ||
                    login.notes.Contains(searchTerm) ||
                    login.name.Contains(searchTerm)
                 );

            var logins = await results
                .Skip(startIndex)
                .Take(maxRecords)
                .ToListAsync();

            return new LoginsRequest
            {
                logins = logins,
                rowCount = results.Count()
            };
        }

        public async Task<Login> GetLogin(long id, string userId)
        {
            Login login = await _db.Logins.FirstAsync(login => login.id == id && login.userId == userId);
            return login;
        }
        public async Task CreateLogin(Login login)
        {
            login.createdOn = DateTime.UtcNow;
            var addResult = await _db.Logins.AddAsync(login);
            var saveResult = await _db.SaveChangesAsync();
        }

        public async Task<Login> UpdateLogin(long loginId, Login login, string userId)
        {
            Login loginToBeUpdated = await GetLogin(loginId, userId);
            if (loginToBeUpdated == null)
            {
                return null;
            }

            loginToBeUpdated.userId = login.userId;
            loginToBeUpdated.name = login.name;
            loginToBeUpdated.url = login.url;
            loginToBeUpdated.username = login.username;
            loginToBeUpdated.password = login.password;
            loginToBeUpdated.notes = login.notes;
            loginToBeUpdated.updatedOn = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return loginToBeUpdated;
        }
        public async Task DeleteLogin(Login login)
        {
            _db.Logins.Remove(login);
            await _db.SaveChangesAsync();
        }
    }
}
