using PasswordManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using CsvHelper;
using PasswordManager.Services.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using PasswordManager.Data.Models;

namespace PasswordManager.Services
{
    public class CSVService : ICSVService
    {
        private readonly ApplicationDbContext _db;
        private readonly ILoginService _loginService;
        public CSVService(ApplicationDbContext db, ILoginService loginService)
        {
            _db = db;
            _loginService = loginService;
        }

        public async Task<Byte[]> Export(string userId)
        {
            var logins = await _loginService.GetAllLogins(userId);
            using (var stringWriter = new StringWriter())
            {
                using (var csvWriter = new CsvWriter(stringWriter, CultureInfo.InvariantCulture))
                {
                    csvWriter.WriteRecords(logins.Select(login => login.ToCSVLogin()));
                    var csv = stringWriter.ToString();
                    return Encoding.UTF8.GetBytes(csv);
                }
            }
            
        }

        public async Task Import(IFormFile file, string userId)
        {
            var logins = new List<Login>();
            using (var stream = new StreamReader(file.OpenReadStream()))
            {
                using (var csvReader = new CsvReader(stream, CultureInfo.InvariantCulture))
                {
                    logins = csvReader
                        .GetRecords<CSVLogin>()
                        .Select(csvLogin => csvLogin.ToLogin())
                        .ToList();
                }
            }
            foreach (var login in logins)
            {
                login.userId = userId;
                await _loginService.CreateLogin(login);
            }
        }
    }
}
