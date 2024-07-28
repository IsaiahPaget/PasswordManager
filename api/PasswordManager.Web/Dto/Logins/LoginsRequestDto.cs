namespace PasswordManager.Web.Dto.LoginDto
{
    public class LoginsRequestDto
    {
        public List<LoginDto>? logins { get; set; }
        public long rowCount { get; set; }
    }
}
