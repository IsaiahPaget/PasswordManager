﻿namespace PasswordManager.Data
{
    public class Login
    {
        public long id { get; set; }
        public long userId { get; set; }
        public string username { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string notes { get; set; } = string.Empty;
        public DateTime createdOn { get; set; }
        public DateTime updatedOn { get; set; }
    }
}
