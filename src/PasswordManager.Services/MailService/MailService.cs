using PasswordManager.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;


namespace PasswordManager.Services.Mail
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> options)
        {
            _mailSettings = options.Value;
        }
        public async Task SendMailAsync(MailData mailData)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail));
            message.To.Add(new MailboxAddress("", mailData.recipientEmail));
            message.Subject = mailData.subject;
            message.Body = new TextPart("html") { Text = mailData.body };

            using (var smtpClient = new SmtpClient()) 
            {
                var socketOption = _mailSettings.UseSSL ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTlsWhenAvailable;
                try
                {
                    await smtpClient.ConnectAsync(_mailSettings.Server, _mailSettings.Port, socketOption);

                    if (!string.IsNullOrEmpty(_mailSettings.Username) && !string.IsNullOrEmpty(_mailSettings.Password))
                    {
                        await smtpClient.AuthenticateAsync(_mailSettings.Username, _mailSettings.Password);
                    }

                    await smtpClient.SendAsync(message);
                }
                catch (Exception ex)
                {
                    throw new Exception("An error has occured with the email trying to be sent", ex);
                }
                finally
                {
                    await smtpClient.DisconnectAsync(true);
                }
            }
        }
    }
}
