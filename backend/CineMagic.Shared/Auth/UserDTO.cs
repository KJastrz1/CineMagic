namespace CineMagic.Shared.Auth
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }        
        public string Email { get; set; }
        public string Role { get; set; }
        public DateTime DateCreated { get; set; }


    }
}
