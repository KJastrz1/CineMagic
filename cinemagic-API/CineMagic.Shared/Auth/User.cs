using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CineMagic.Shared.Models;

namespace CineMagic.Shared.Auth
{
    public class User
    {

        public User()
        {
            Comments = new HashSet<Comment>();
            Ratings = new HashSet<MovieRating>();
            CreatedMovies = new HashSet<Movie>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public string? GoogleId { get; set; }
        public string Role { get; set; } = "User";
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<MovieRating> Ratings { get; set; }
        public virtual ICollection<Movie> CreatedMovies { get; set; }
    }
}
