using Microsoft.EntityFrameworkCore;
using CineMagic.API.Models;
using CineMagic.Shared;
using CineMagic.Shared.Models;
using CineMagic.Shared.Services.MovieService;
using CineMagic.DataSeeder;
using CineMagic.API.Services;
using AutoMapper;

namespace CineMagic.API.Services.MovieService
{
    public class MovieService : IMovieService
    {
        private readonly DataContext _dataContext;
        private readonly FileService _fileService;
        private readonly IMapper _mapper;
        private readonly ILogger<MovieService> _logger;

        public MovieService(DataContext context, FileService fileService, IMapper mapper, ILogger<MovieService> logger)
        {
            _fileService = fileService;
            _mapper = mapper;
            _dataContext = context;
            _logger = logger;
        }







        public async Task<ServiceResponse<bool>> DeleteMovieAsync(int id)
        {
            var Movie = new Movie() { Id = id };
            _dataContext.Movies.Attach(Movie);
            _dataContext.Movies.Remove(Movie);
            await _dataContext.SaveChangesAsync();

            return new ServiceResponse<bool>() { Data = true, Success = true };
        }

        public async Task<ServiceResponse<GetMovieDetailsDTO>> GetMovieByIdAsync(int id)
        {
            try
            {
                var movie = await _dataContext.Movies.FindAsync(id);
                if (movie == null)
                {
                    return new ServiceResponse<GetMovieDetailsDTO>
                    {
                        Data = null,
                        Message = "Movie not found",
                        Success = false
                    };
                }

                var movieDto = _mapper.Map<GetMovieDetailsDTO>(movie);

                return new ServiceResponse<GetMovieDetailsDTO>
                {
                    Data = movieDto,
                    Message = "Ok",
                    Success = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<GetMovieDetailsDTO>
                {
                    Data = null,
                    Message = "Problem with database",
                    Success = false
                };
            }
        }


        public async Task<ServiceResponse<List<GetMoviePartialDTO>>> GetMoviesAsync()
        {
            try
            {
                var movies = await _dataContext.Movies.ToListAsync();

                var movieDtos = _mapper.Map<List<GetMoviePartialDTO>>(movies);

                return new ServiceResponse<List<GetMoviePartialDTO>>
                {
                    Data = movieDtos,
                    Message = "Ok",
                    Success = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<List<GetMoviePartialDTO>>
                {
                    Data = null,
                    Message = "Problem with database",
                    Success = false
                };
            }
        }
        public async Task<ServiceResponse<PaginatedResult<GetMoviePartialDTO>>> SearchMoviesAsync(string text, int page, int pageSize)
        {
            try
            {
                IQueryable<Movie> query = _dataContext.Movies;

                if (!string.IsNullOrEmpty(text))
                    query = query.Where(m => m.Title.Contains(text)
                        || m.Director.Contains(text)
                        || m.Description.Contains(text));

                var totalRecords = await query.CountAsync();

                var movies = await query
                    .Skip(pageSize * (page - 1))
                    .Take(pageSize)
                    .ToListAsync();
                var moviesDTO = _mapper.Map<List<GetMoviePartialDTO>>(movies);
                var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

                var response = new ServiceResponse<PaginatedResult<GetMoviePartialDTO>>()
                {
                    Data = new PaginatedResult<GetMoviePartialDTO>
                    {
                        PageContent = moviesDTO,
                        TotalRecords = totalRecords,
                        PageSize = pageSize,
                        CurrentPage = page
                    },
                    Message = "Ok",
                    Success = true
                };

                return response;
            }
            catch (Exception)
            {
                return new ServiceResponse<PaginatedResult<GetMoviePartialDTO>>()
                {
                    Data = null,
                    Message = "Problem with the database",
                    Success = false
                };
            }
        }
        public async Task<ServiceResponse<int>> CreateMovieAsync(CreateUpdateMovieDTO movieDTO)
        {
            var response = new ServiceResponse<int>();
            try
            {
                var movie = _mapper.Map<Movie>(movieDTO);


                _dataContext.Movies.Add(movie);
                await _dataContext.SaveChangesAsync();


                if (movieDTO.Image != null && movieDTO.Image.Length > 0)
                {


                    var uploadResult = await _fileService.UploadFileAsync(movieDTO.Image, "movies");

                    if (uploadResult.Success)
                    {
                        movie.ImageUrl = uploadResult.Data;
                        await _dataContext.SaveChangesAsync();
                    }
                    else
                    {
                        response.Success = false;
                        response.Message = uploadResult.Message;
                        return response;
                    }
                }

                response.Data = movie.Id;
                response.Success = true;
                response.Message = "Movie created";
            }
            catch (Exception ex)
            {
                response.Data = 0;
                response.Success = false;
                response.Message = $"Cannot create Movie: {ex.Message}";
            }

            return response;
        }
        public async Task<ServiceResponse<bool>> UpdateMovieAsync(CreateUpdateMovieDTO movieDTO, int id)
        {
            try
            {
                var movieToUpdate = await _dataContext.Movies.FindAsync(id);
                if (movieToUpdate == null)
                {
                    return new ServiceResponse<bool>
                    {
                        Success = false,
                        Message = "Movie not found."
                    };
                }
                if (movieDTO.Image != null && movieDTO.Image.Length > 0)
                {

                    var uploadResult = await _fileService.UploadFileAsync(movieDTO.Image, "movies");
                    if (uploadResult.Success)
                    {
                        movieToUpdate.ImageUrl = uploadResult.Data;
                    }
                    else
                    {
                        return new ServiceResponse<bool>
                        {
                            Success = false,
                            Message = uploadResult.Message
                        };
                    }
                }

                movieToUpdate.Title = movieDTO.Title;
                movieToUpdate.Director = movieDTO.Director;
                movieToUpdate.Description = movieDTO.Description;


                await _dataContext.SaveChangesAsync();
                return new ServiceResponse<bool>
                {
                    Data = true,
                    Success = true,
                    Message = "Movie updated successfully."
                };

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating movie with ID {MovieId}", id);
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = "Problem with the database"
                };
            }
        }


    }



}
