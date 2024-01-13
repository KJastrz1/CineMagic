using CineMagic.Shared.Auth;
namespace CineMagic.Shared.Models
{
    public class UserRatingDTO
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }

        public float Rating { get; set; }
    }
}
