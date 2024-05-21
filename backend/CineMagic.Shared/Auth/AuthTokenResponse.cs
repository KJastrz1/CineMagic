namespace CineMagic.Shared.Auth
{
    public class AuthTokenResponse
    {
        public string JwtToken { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

        public int UserId { get; set; }

        public string Username { get; set; }
    }
}
