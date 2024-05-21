using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using CineMagic.Shared;
using CineMagic.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using CineMagic.API.Services;
using CineMagic.Shared.Services.MovieService;

namespace CineMagic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : Controller
    {
        private readonly IRatingService _RatingService;
        private readonly ILogger<RatingController> _logger;

        public RatingController(IRatingService RatingService, FileService fileService, ILogger<RatingController> logger)
        {

            _RatingService = RatingService;
            _logger = logger;
        }

        [HttpGet("{movieId}/{userId}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<UserRatingDTO>>> GetUserRating([FromRoute] int movieId, int userId)
        {

            var result = await _RatingService.GetUserRatingAsync(movieId, userId);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Message.Contains("not found"))
            {
                return NotFound(result);
            }
            else
            {
                return StatusCode(500, $"Internal server error {result.Message}");
            }
        }

        [HttpGet("{movieId}")]
        [Authorize(Roles = "User, Admin")]

        public async Task<ActionResult<ServiceResponse<MovieRatingDTO>>> GetMovieRating([FromRoute] int movieId)
        {

            var result = await _RatingService.GetMovieRatingAsync(movieId);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Message.Contains("not found"))
            {
                return NotFound(result);
            }
            else
            {
                return StatusCode(500, $"Internal server error {result.Message}");
            }
        }

        [HttpPut]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<bool>>> UpdateRating([FromBody] UserRatingDTO RatingDTO)
        {
            var result = await _RatingService.CreateUpdateRatingAsync(RatingDTO);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Message.Contains("between 1 and 10"))
            {
                return BadRequest(result);
            }
            else if (result.Message.Contains("not found"))
            {
                return NotFound(result);
            }
            else
            {
                return StatusCode(500, $"Internal server error");
            }
        }

        [HttpPost]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<int>>> CreateRating([FromBody] UserRatingDTO RatingDTO)
        {
            var result = await _RatingService.CreateUpdateRatingAsync(RatingDTO);

            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Message.Contains("between 1 and 10"))
            {
                return BadRequest(result);
            }
            else if (result.Message.Contains("not found"))
            {
                return NotFound(result);
            }
            else
            {
                return StatusCode(500, $"Internal server error ");
            }
        }

        [HttpDelete("{movieId}/{userId}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteRating(int movieId, int userId)
        {
            var result = await _RatingService.DeleteRatingAsync(movieId, userId);


            if (result.Success)
            {
                return Ok(result);
            }
            else if (result.Message.Contains("not found"))
            {
                return NotFound(result);
            }
            else
            {
                return StatusCode(500, $"Internal server error {result.Message}");
            }
        }

    }
}
