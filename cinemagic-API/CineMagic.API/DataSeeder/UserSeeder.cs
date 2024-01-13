using System.Collections.Generic;
using CineMagic.API.Services.AuthService;
using CineMagic.Shared;
using CineMagic.Shared.Auth;

namespace CineMagic.DataSeeder
{

    public class UserSeeder
    {
        private readonly IAuthService _authService;

        public UserSeeder(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task SeedUsersAsync()
        {
            var usersToSeed = new List<(string Email, string Username, string Password)>
            {
            ("user1@example.com", "user1", "password"),
            ("admin@example.com", "admin", "password")
            };

            foreach (var (email, username, password) in usersToSeed)
            {
                var user = new User()
                {
                    Email = email,
                    Username = username
                };
                var result = await _authService.Register(user, password);

            }
            await _authService.ChangeUserRole("admin@example.com", "Admin");
        }
    }

}
