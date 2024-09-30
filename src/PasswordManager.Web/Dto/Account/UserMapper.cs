using PasswordManager.Data.Models;

namespace PasswordManager.Web.Dto.Account
{
    public static class UserMapper
    {
        public static UserDto ToUserDto(this AppUser appUser)
        {
            return new UserDto
            {
                username = appUser.UserName,
                email = appUser.Email
            };
        }
    }
}
