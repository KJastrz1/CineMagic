using CineMagic.Shared.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CineMagic.Shared.Services.MovieService
{
  public interface IMovieService
  {
    Task<ServiceResponse<int>> CreateMovieAsync(CreateUpdateMovieDTO movieDTO);
    Task<ServiceResponse<bool>> DeleteMovieAsync(int id);
    Task<ServiceResponse<GetMovieDetailsDTO>> GetMovieByIdAsync(int id);
    Task<ServiceResponse<List<GetMoviePartialDTO>>> GetMoviesAsync();
    Task<ServiceResponse<PaginatedResult<GetMoviePartialDTO>>> SearchMoviesAsync(string text, int page, int pageSize);
    Task<ServiceResponse<bool>> UpdateMovieAsync(CreateUpdateMovieDTO movieDTO, int id);
  }
}
