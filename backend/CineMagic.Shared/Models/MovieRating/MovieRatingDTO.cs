using CineMagic.Shared.Auth;
namespace CineMagic.Shared.Models
{
    public class MovieRatingDTO
    {
        public int MovieId { get; set; }

        public float? Rating { get; set; }
        public int? NumberOfRatings { get; set; }
    }
}
