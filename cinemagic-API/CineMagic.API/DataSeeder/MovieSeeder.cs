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

            var MovieFaker = new Faker<Movie>("pl")
                .UseSeed(123456)
                .RuleFor(x => x.Title, x => x.Commerce.ProductName())              
                .RuleFor(x => x.Director, x => x.Name.FullName())
                .RuleFor(x => x.Description, x => x.Lorem.Paragraphs(1))
                .RuleFor(x => x.ImageUrl, (x, movie) =>
                    $"https://res.cloudinary.com/{cloudName}/image/upload/v1703685194/movies/{movie.Id}-poster.png");


            return MovieFaker.Generate(14).ToList();
        }
    }
}
