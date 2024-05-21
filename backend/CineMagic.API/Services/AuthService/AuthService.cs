using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using CineMagic.API.Models;
using CineMagic.Shared;
using CineMagic.Shared.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CineMagic.API.Services.AuthService
{

    public class AuthService : IAuthService
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthService> _logger;
        public AuthService(DataContext context, IConfiguration config, ILogger<AuthService> logger)
        {
            _context = context;
            _config = config;
            _logger = logger;
        }

        public async Task<ServiceResponse<bool>> ChangePassword(int userId, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return new ServiceResponse<bool>
                {
                    Success = false,
                    Message = "User not found."
                };
            }


            if (!VerifyPasswordHash(currentPassword, user.PasswordHash, user.PasswordSalt))
            {
                return new ServiceResponse<bool>
                {
                    Success = false,
                    Message = "Current password is incorrect."
                };
            }


            CreatePasswordHash(newPassword, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.SaveChangesAsync();
            return new ServiceResponse<bool>
            {
                Data = true,
                Message = "Password updated successfully.",
                Success = true
            };
        }
        public async Task<ServiceResponse<AuthTokenResponse>> Login(string email, string password)
        {
            var response = new ServiceResponse<AuthTokenResponse>();

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found.";
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Incorrect password.";
            }
            else
            {
                var authTokenResponse = new AuthTokenResponse
                {
                    JwtToken = CreateToken(user),
                    Email = user.Email,
                    Role = user.Role,
                    UserId = user.Id,
                    Username = user.Username
                };
                response.Data = authTokenResponse;
                response.Success = true;
                response.Message = "Login successful.";
            }


            return response;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
             {
                 new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                 new Claim(ClaimTypes.Name, user.Email),
                 new Claim(ClaimTypes.Role, user.Role),
                 new Claim("DateCreated", user.DateCreated.ToString()),
             };

            SymmetricSecurityKey key =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
       
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                               claims: claims,
                               expires: DateTime.Now.AddDays(1),
                               signingCredentials: creds
                  );

            var tokenHandler = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenHandler;
        }

        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            if (await UserExists(user.Email))
            {
                return new ServiceResponse<int>
                {
                    Success = false,
                    Message = "User already exists."
                };
            }


            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);


            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new ServiceResponse<int> { Success = true, Data = user.Id, Message = "Registration successful!" };

        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {

                passwordSalt = hmac.Key;

                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }




        public async Task<ServiceResponse<AuthTokenResponse>> GoogleLogin(User user)
        {

            if (!await UserExists(user.Email))
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
            }
            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == user.Email.ToLower());

            var authTokenResponse = new AuthTokenResponse
            {
                JwtToken = CreateToken(existingUser),
                Email = existingUser.Email,
                Role = existingUser.Role,
                UserId = existingUser.Id,
                Username = existingUser.Username
            };
            return new ServiceResponse<AuthTokenResponse>
            {
                Data = authTokenResponse,
                Success = true,
                Message = "Login successful."
            };
        }

        public async Task<ServiceResponse<bool>> ChangeUserRole(string email, string role){
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
            if (user == null)
            {
                return new ServiceResponse<bool>
                {
                    Success = false,
                    Message = "User not found."
                };
            }

            user.Role = role;
            await _context.SaveChangesAsync();
            return new ServiceResponse<bool>
            {
                Data = true,
                Message = "Role updated successfully.",
                Success = true
            };
        }


    }
}
