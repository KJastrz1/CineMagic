using CineMagic.Shared.Auth;
namespace CineMagic.Shared.Models
{
    public class MovieRating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
        public float Rating { get; set; }
    }
}
