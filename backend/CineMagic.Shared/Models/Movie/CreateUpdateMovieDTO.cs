using Microsoft.AspNetCore.Http;

namespace CineMagic.Shared.Models
{
    public class CreateUpdateMovieDTO
    {
        public IFormFile? Image { get; set; }
        public string? Title { get; set; }
        public string? Director { get; set; }
        public string? Description { get; set; }


    }
}
