using CineMagic.Shared;
using CineMagic.Shared.Auth;

namespace CineMagic.API.Services.AuthService
{
    public interface IAuthService
    {
        Task<ServiceResponse<AuthTokenResponse>> Login(string email, string password);

        Task<ServiceResponse<int>> Register(User user, string password);

        Task<bool> UserExists(string email);

        Task<ServiceResponse<bool>> ChangePassword(int userId, string currentPassword, string newPassword);

        Task<ServiceResponse<AuthTokenResponse>> GoogleLogin(User user);
        Task<ServiceResponse<bool>> ChangeUserRole(string email, string role);

    }
}
