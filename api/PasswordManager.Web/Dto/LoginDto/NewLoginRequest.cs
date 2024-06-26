namespace PasswordManager.Web.Dto.LoginDto
{
    public class NewLoginRequest
    {
        public long userId { get; set; }
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty; 
        public string notes { get; set; } = string.Empty;
    }
}
