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
    public class CommentController : Controller
    {
        private readonly ICommentService _CommentService;
        private readonly ILogger<CommentController> _logger;

        public CommentController(ICommentService CommentService, FileService fileService, ILogger<CommentController> logger)
        {

            _CommentService = CommentService;
            _logger = logger;
        }



        [HttpGet("/movie/{movieId}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<List<GetCommentDTO>>>> GetCommentsByMovie(int movieId)
        {
            var result = await _CommentService.GetCommentsByMovieAsync(movieId);

            if (!result.Success)
            {
                if (result.Message == "Movie not found")
                    return NotFound(result);
                else
                    return StatusCode(500, $"Internal server error {result.Message}");
            }

            return Ok(result);
        }

        [HttpGet("{movieId}/search/{text}/{page}/{pageSize}")]
        [HttpGet("{movieId}/search/{page}/{pageSize}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<PaginatedResult<GetCommentDTO>>>> SearchComments(int movieId, string? text = null, int page = 1, int pageSize = 10)
        {

            var result = await _CommentService.SearchCommentsAsync(movieId, text, page, pageSize);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }



        [HttpGet("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<GetCommentDTO>>> GetComment(int id)
        {

            var result = await _CommentService.GetCommentByIdAsync(id);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }


        [HttpPost]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<GetCommentDTO>>> CreateComment([FromBody] CreateCommentDTO CommentDTO)
        {
            var result = await _CommentService.CreateCommentAsync(CommentDTO);

            if (result.Success)
                return Ok(result);
            else if (result.Message == "User not found" || result.Message == "Movie not found")
                return NotFound(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<GetCommentDTO>>> UpdateComment([FromBody] UpdateCommentDTO CommentDTO, int id)
        {
            var result = await _CommentService.UpdateCommentAsync(CommentDTO, id);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }




        [HttpDelete("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult<ServiceResponse<bool>>> DeleteComment([FromRoute] int id)
        {
            var result = await _CommentService.DeleteCommentAsync(id);

            if (result.Success)
                return Ok(result);
            else
                return StatusCode(500, $"Internal server error {result.Message}");
        }

    }
}
