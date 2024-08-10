using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services
{
    public interface ICSVService
    {
        public Task<Byte[]> Export(string userId);
        public Task Import(IFormFile file, string userId);
    }
}
