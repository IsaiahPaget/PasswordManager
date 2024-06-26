﻿using Microsoft.EntityFrameworkCore;
using PasswordManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services
{
    public class LoginService : ILoginService
    {
        private readonly ApplicationDbContext _db;
        public LoginService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<List<Login>> GetAllLogins(int startIndex, int maxRecords, string searchTerm)
        {
            List<Login> logins = await _db.Logins
                .Skip(startIndex)
                .Take(maxRecords)
                .ToListAsync();

            return logins;
        }

        public async Task<Login> GetLogin(long id)
        {
            Login login = await _db.Logins.FirstAsync(login => login.id == id);
            return login;
        }

        public async Task CreateLogin(Login login)
        {
            login.createdOn = DateTime.UtcNow;
            await _db.Logins.AddAsync(login);
            await _db.SaveChangesAsync();
        }

        public async Task<Login> UpdateLogin(long loginId, Login login)
        {
            Login loginToBeUpdated = await GetLogin(loginId);
            if (loginToBeUpdated == null) 
            {
                return new Login();
            }
            
            loginToBeUpdated.userId = login.userId;
            loginToBeUpdated.username = login.username;
            loginToBeUpdated.password = login.password;
            loginToBeUpdated.notes = login.notes;
            loginToBeUpdated.updatedOn = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return loginToBeUpdated;
        }
        public async Task<long> DeleteLogin(long id)
        {
            Login login = await GetLogin(id);
            if (login == null)
            {
                return 0;
            }
            _db.Logins.Remove(login);
            await _db.SaveChangesAsync();
            return id;
        }
    }
}
