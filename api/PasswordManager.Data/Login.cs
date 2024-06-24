namespace PasswordManager.Data
{
    public class Login
    {
        public long id { get; set; }
        public long userId { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string notes { get; set; }
        public DateTime createOn { get; set; }
        public DateTime updatedOn { get; set; }
    }
}
