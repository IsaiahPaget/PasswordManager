using System.ComponentModel.DataAnnotations;

namespace PasswordManager.Web.Dto.Account
{
    public class UpdateUserDto
    {
        [Required]
        [MinLength(3)]
        [MaxLength(256)]
        public string username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MinLength(4)]
        [MaxLength(256)]
        public string email { get; set; } = string.Empty;
    }
}
