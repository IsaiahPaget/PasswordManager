using PasswordManager.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PasswordManager.Services.Mail
{
    public interface IMailService
    {
        public Task SendMailAsync(MailData mailData);
    }
}
