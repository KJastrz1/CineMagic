using Bogus;
using CineMagic.Shared.Models;
using System.Collections.Generic;
using System.Linq;
using CineMagic.API.Models;

namespace CineMagic.DataSeeder
{
    public class MovieSeeder
    {

        private readonly DataContext _context;

        private readonly string cloudName;

        public MovieSeeder(DataContext context, IConfiguration config)
        {
            _context = context;
            cloudName = config["Cloudinary:CloudName"];
        }

        public async Task SeedMoviesAsync()
        {
            if (!_context.Movies.Any())
            {
                var movies = GenerateMovieData();
                _context.Movies.AddRange(movies);
                await _context.SaveChangesAsync();
            }
        }
        public List<Movie> GenerateMovieData()
        {
            int id = 1;
            var movieFaker = new Faker<Movie>("pl")
                .UseSeed(123456)
                .RuleFor(m => m.Title, f => f.Commerce.ProductName())
                .RuleFor(m => m.Director, f => f.Name.FullName())
                .RuleFor(m => m.Description, f => f.Lorem.Paragraphs(1))
                .RuleFor(m => m.ImageUrl, f => $"https://res.cloudinary.com/{cloudName}/image/upload/v1703685194/movies/{id++}-poster.png");

            return movieFaker.Generate(14).ToList();
        }
    }
}
