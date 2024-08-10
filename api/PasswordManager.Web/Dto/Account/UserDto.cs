using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Web.Dto.Account
{
    public class UserDto
    {
        [Required]
        public string username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string email { get; set; } = string.Empty;
    }
}
