using Microsoft.EntityFrameworkCore;
using CineMagic.API.Models;
using CineMagic.Shared;
using CineMagic.Shared.Models;

using CineMagic.DataSeeder;
using CineMagic.API.Services;
using AutoMapper;
using CineMagic.Shared.Services.MovieService;

namespace CineMagic.API.Services.MovieService
{
    public class RatingService : IRatingService
    {
        private readonly DataContext _dataContext;

        private readonly IMapper _mapper;
        private readonly ILogger<RatingService> _logger;

        public RatingService(DataContext context, IMapper mapper, ILogger<RatingService> logger)
        {
            _mapper = mapper;
            _dataContext = context;
            _logger = logger;
        }






        public async Task<ServiceResponse<bool>> CreateUpdateRatingAsync(UserRatingDTO ratingDTO)
        {
            try
            {
                if (ratingDTO.Rating < 1 || ratingDTO.Rating > 10)
                {
                    return new ServiceResponse<bool>
                    {
                        Data = false,
                        Success = false,
                        Message = "Rating must be between 1 and 10."
                    };
                }
                var res = CheckMovieAndUserExistenceAsync(ratingDTO.MovieId, ratingDTO.UserId);
                if (!res.Result.Success)
                {
                    return res.Result;
                }
                var ratingToUpdate = await _dataContext.MovieRatings
                    .FirstOrDefaultAsync(r => r.UserId == ratingDTO.UserId && r.MovieId == ratingDTO.MovieId);


                if (ratingToUpdate == null)
                {
                    var newRating = new MovieRating
                    {
                        UserId = ratingDTO.UserId,
                        MovieId = ratingDTO.MovieId,
                        Rating = ratingDTO.Rating
                    };

                    _dataContext.MovieRatings.Add(newRating);
                }
                else
                {
                    ratingToUpdate.Rating = ratingDTO.Rating;
                }

                await _dataContext.SaveChangesAsync();

                var ratings = await _dataContext.MovieRatings
                    .Where(r => r.MovieId == ratingDTO.MovieId)
                    .ToListAsync();

                var averageRating = ratings.Average(r => r.Rating);
                var numberOfRatings = ratings.Count;

                var movieToUpdate = await _dataContext.Movies.FindAsync(ratingDTO.MovieId);
                if (movieToUpdate != null)
                {
                    movieToUpdate.Rating = averageRating;
                    movieToUpdate.NumberOfRatings = numberOfRatings;
                    await _dataContext.SaveChangesAsync();
                }

                return new ServiceResponse<bool>
                {
                    Data = true,
                    Success = true,
                    Message = "Rating updated successfully."
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = $"Problem with the database: {ex.Message}"
                };
            }
        }




        public async Task<ServiceResponse<bool>> DeleteRatingAsync(int movieId, int userId)
        {
            try
            {
                var res = CheckMovieAndUserExistenceAsync(movieId, userId);
                if (!res.Result.Success)
                {
                    return res.Result;
                }
                var ratingToDelete = await _dataContext.MovieRatings
                    .FirstOrDefaultAsync(r => r.UserId == userId && r.MovieId == movieId);


                if (ratingToDelete == null)
                {
                    return new ServiceResponse<bool>
                    {
                        Data = false,
                        Success = false,
                        Message = "Rating not found."
                    };
                }
                _dataContext.MovieRatings.Remove(ratingToDelete);
                await _dataContext.SaveChangesAsync();

                return new ServiceResponse<bool>
                {
                    Data = true,
                    Success = true,
                    Message = "Rating deleted successfully."
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = $"Error while deleting rating: {ex.Message}"
                };
            }
        }


        public async Task<ServiceResponse<UserRatingDTO>> GetUserRatingAsync(int movieId, int userId)
        {
            try
            {
                var res = CheckMovieAndUserExistenceAsync(movieId, userId);
                if (!res.Result.Success)
                {
                    return new ServiceResponse<UserRatingDTO>
                    {
                        Data = null,
                        Message = res.Result.Message,
                        Success = false
                    };

                }
                var rating = await _dataContext.MovieRatings
           .FirstOrDefaultAsync(r => r.UserId == userId && r.MovieId == movieId);
                if (rating == null)
                {
                    var userRatingDTO = new UserRatingDTO
                    {
                        UserId = userId,
                        MovieId = movieId,
                        Rating = -1
                    };
                    return new ServiceResponse<UserRatingDTO>
                    {
                        Data = userRatingDTO,
                        Message = "No user rating yet.",
                        Success = true
                    };
                }

                var ratingDto = _mapper.Map<UserRatingDTO>(rating);

                return new ServiceResponse<UserRatingDTO>
                {
                    Data = ratingDto,
                    Message = "Ok",
                    Success = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<UserRatingDTO>
                {
                    Data = null,
                    Message = "Problem with database",
                    Success = false
                };
            }
        }
        public async Task<ServiceResponse<MovieRatingDTO>> GetMovieRatingAsync(int movieId)
        {
            try
            {
                var res = CheckMovieExistenceAsync(movieId);
                if (!res.Result.Success)
                {
                    return new ServiceResponse<MovieRatingDTO>
                    {
                        Data = null,
                        Message = res.Result.Message,
                        Success = false
                    };

                }
                var movie = await _dataContext.Movies.FindAsync(movieId);

                var ratingDto = new MovieRatingDTO
                {
                    MovieId = movie.Id,
                    Rating = movie.Rating,
                    NumberOfRatings = movie.NumberOfRatings
                };

                return new ServiceResponse<MovieRatingDTO>
                {
                    Data = ratingDto,
                    Message = "Ok",
                    Success = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<MovieRatingDTO>
                {
                    Data = null,
                    Message = "Problem with database",
                    Success = false
                };
            }
        }


        private async Task<ServiceResponse<bool>> CheckMovieAndUserExistenceAsync(int movieId, int userId)
        {
            var movieExists = await _dataContext.Movies.AnyAsync(m => m.Id == movieId);
            if (!movieExists)
            {
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = "Movie not found."
                };
            }

            var userExists = await _dataContext.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = "User not found."
                };
            }

            return new ServiceResponse<bool>
            {
                Data = true,
                Success = true,
                Message = "Movie and user exist."
            };
        }
        private async Task<ServiceResponse<bool>> CheckMovieExistenceAsync(int movieId)
        {
            var movieExists = await _dataContext.Movies.AnyAsync(m => m.Id == movieId);
            if (!movieExists)
            {
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = "Movie not found."
                };
            }

            return new ServiceResponse<bool>
            {
                Data = true,
                Success = true,
                Message = "Movie exists."
            };
        }

        private async Task<ServiceResponse<bool>> CheckUserExistenceAsync(int userId)
        {
            var userExists = await _dataContext.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return new ServiceResponse<bool>
                {
                    Data = false,
                    Success = false,
                    Message = "User not found."
                };
            }

            return new ServiceResponse<bool>
            {
                Data = true,
                Success = true,
                Message = "User exists."
            };
        }


    }
}
