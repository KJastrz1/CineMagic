using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using CineMagic.Shared;
using CineMagic.Shared.Services.MovieService;
using CineMagic.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using CineMagic.API.Services.MovieService;

namespace CineMagic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : Controller
    {
        private readonly IMovieService _MovieService;
        private readonly ILogger<MovieController> _logger;

        public MovieController(IMovieService MovieService, ILogger<MovieController> logger)
        {
            _MovieService = MovieService;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<List<GetMoviePartialDTO>>>> GetMovies()
        {           

            var result = await _MovieService.GetMoviesAsync();

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }

        [HttpGet("search/{text}/{page}/{pageSize}")]
        [HttpGet("search/{page}/{pageSize}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<PaginatedResult<GetMoviePartialDTO>>>> SearchMovies(string? text = null, int page = 1, int pageSize = 10)
        {

            var result = await _MovieService.SearchMoviesAsync(text, page, pageSize);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }



        [HttpGet("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<GetMovieDetailsDTO>>> GetMovie(int id)
        {

            var result = await _MovieService.GetMovieByIdAsync(id);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponse<bool>>> UpdateMovie([FromForm] CreateUpdateMovieDTO movieDTO, int id)
        {



            var result = await _MovieService.UpdateMovieAsync(movieDTO, id);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponse<int>>> CreateMovie([FromForm] CreateUpdateMovieDTO movieDTO)
        {
            var result = await _MovieService.CreateMovieAsync(movieDTO);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteMovie([FromRoute] int id)
        {
            var result = await _MovieService.DeleteMovieAsync(id);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }





    }
}
