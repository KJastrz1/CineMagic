using CineMagic.Shared.Models;
using System.Threading.Tasks;

namespace CineMagic.Shared.Services.MovieService
{
    public interface IRatingService
    {
        Task<ServiceResponse<bool>> CreateUpdateRatingAsync(UserRatingDTO ratingDTO);
        Task<ServiceResponse<bool>> DeleteRatingAsync(int movieId, int userId);
        Task<ServiceResponse<UserRatingDTO>> GetUserRatingAsync(int movieId, int userId);
        Task<ServiceResponse<MovieRatingDTO>> GetMovieRatingAsync(int movieId);
    }
}
