using CineMagic.Shared.Models;

namespace CineMagic.Shared.Services.MovieService
{
    public interface ICommentService
    {
        Task<ServiceResponse<GetCommentDTO>> CreateCommentAsync(CreateCommentDTO commentDTO);
        Task<ServiceResponse<GetCommentDTO>> UpdateCommentAsync(UpdateCommentDTO commentDTO, int id);
        Task<ServiceResponse<bool>> DeleteCommentAsync(int id);
        Task<ServiceResponse<GetCommentDTO>> GetCommentByIdAsync(int id);
        Task<ServiceResponse<List<GetCommentDTO>>> GetCommentsByMovieAsync(int movieId);
        Task<ServiceResponse<PaginatedResult<GetCommentDTO>>> SearchCommentsAsync(int movieId, string text, int page, int pageSize);
    }
}
