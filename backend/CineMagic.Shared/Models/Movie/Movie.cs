using System.Collections.Generic;
using CineMagic.Shared.Auth;

namespace CineMagic.Shared.Models
{
    public class Movie
    {
        public Movie()
        {
            Comments = new HashSet<Comment>();
            Ratings = new HashSet<MovieRating>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Director { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public float? Rating { get; set; } = null;
        public int? NumberOfRatings { get; set; } = 0;
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<MovieRating> Ratings { get; set; }
        public int? CreatedByUserId { get; set; }
        public virtual User? CreatedByUser { get; set; }


    }
}
