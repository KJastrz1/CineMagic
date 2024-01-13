using System.Collections.Generic;
using CineMagic.Shared.Auth;

namespace CineMagic.Shared.Models
{
    public class GetMovieDetailsDTO
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string? Director { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public float? Rating { get; set; } = null;

        public int? NumberOfRatings { get; set; } = null;




    }
}
