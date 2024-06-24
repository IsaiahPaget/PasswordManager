using Microsoft.EntityFrameworkCore;
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
            await _db.Logins.AddAsync(login);
            await _db.SaveChangesAsync();
        }

        public async Task<long> UpdateLogin(Login login)
        {
            return login.id;
        }
        public void DeleteLogin(long id)
        {
            throw new NotImplementedException();
        }
    }
}
