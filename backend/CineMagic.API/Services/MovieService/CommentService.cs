using Microsoft.EntityFrameworkCore;
using CineMagic.API.Models;
using CineMagic.Shared;
using CineMagic.Shared.Models;

using CineMagic.Shared.Auth;

using AutoMapper;
using CineMagic.Shared.Services.MovieService;

namespace CineMagic.API.Services.MovieService
{
    public class CommentService : ICommentService
    {
        private readonly DataContext _dataContext;

        private readonly IMapper _mapper;
        private readonly ILogger<CommentService> _logger;

        public CommentService(DataContext context, IMapper mapper, ILogger<CommentService> logger)
        {
            _mapper = mapper;
            _dataContext = context;
            _logger = logger;
        }





        public async Task<ServiceResponse<GetCommentDTO>> CreateCommentAsync(CreateCommentDTO CommentDTO)
        {
            var response = new ServiceResponse<GetCommentDTO>();
            try
            {
                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == CommentDTO.UserId);
                if (user == null)
                {
                    response.Success = false;
                    response.Message = "User not found";
                    return response;
                }

                var movieExists = await _dataContext.Movies.AnyAsync(m => m.Id == CommentDTO.MovieId);
                if (!movieExists)
                {
                    response.Success = false;
                    response.Message = "Movie not found";
                    return response;
                }

                var Comment = _mapper.Map<Comment>(CommentDTO);
                Comment.User = user;
                _dataContext.Comments.Add(Comment);
                await _dataContext.SaveChangesAsync();

                var CommentDto = _mapper.Map<GetCommentDTO>(Comment);

                response.Data = CommentDto;
                response.Success = true;
                response.Message = "Comment created";
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = $"Cannot create Comment: {ex.Message}";
            }

            return response;
        }


        public async Task<ServiceResponse<GetCommentDTO>> UpdateCommentAsync(UpdateCommentDTO CommentDTO, int id)
        {
            try
            {
                var CommentToUpdate = await _dataContext.Comments
                    .Include(c => c.User)
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (CommentToUpdate == null)
                {
                    return new ServiceResponse<GetCommentDTO>
                    {
                        Data = null,
                        Success = false,
                        Message = "Comment not found."
                    };
                }

                CommentToUpdate.Text = CommentDTO.Text;

                await _dataContext.SaveChangesAsync();

                var updatedCommentDto = _mapper.Map<GetCommentDTO>(CommentToUpdate);

                return new ServiceResponse<GetCommentDTO>
                {
                    Data = updatedCommentDto,
                    Success = true,
                    Message = "Comment updated successfully."
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<GetCommentDTO>
                {
                    Data = null,
                    Success = false,
                    Message = $"Problem with the database: {ex.Message}"
                };
            }
        }



        public async Task<ServiceResponse<bool>> DeleteCommentAsync(int id)
        {
            var Comment = new Comment() { Id = id };
            _dataContext.Comments.Attach(Comment);
            _dataContext.Comments.Remove(Comment);
            await _dataContext.SaveChangesAsync();

            return new ServiceResponse<bool>() { Data = true, Success = true };
        }

        public async Task<ServiceResponse<GetCommentDTO>> GetCommentByIdAsync(int id)
        {
            try
            {
                var Comment = await _dataContext.Comments.Include(c => c.User).FirstOrDefaultAsync(c => c.Id == id);
                if (Comment == null)
                {
                    return new ServiceResponse<GetCommentDTO>
                    {
                        Data = null,
                        Message = "Comment not found",
                        Success = false
                    };
                }

                var CommentDto = _mapper.Map<GetCommentDTO>(Comment);

                return new ServiceResponse<GetCommentDTO>
                {
                    Data = CommentDto,
                    Message = "Ok",
                    Success = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<GetCommentDTO>
                {
                    Data = null,
                    Message = "Problem with database",
                    Success = false
                };
            }
        }


        public async Task<ServiceResponse<List<GetCommentDTO>>> GetCommentsByMovieAsync(int movieId)
        {
            try
            {

                var movieExists = await _dataContext.Movies.AnyAsync(m => m.Id == movieId);
                if (!movieExists)
                {
                    return new ServiceResponse<List<GetCommentDTO>>
                    {
                        Data = null,
                        Message = "Movie not found",
                        Success = false
                    };
                }


                var comments = await _dataContext.Comments
                    .Where(c => c.MovieId == movieId)
                    .Include(c => c.User)
                    .ToListAsync();

                var commentDtos = _mapper.Map<List<GetCommentDTO>>(comments);

                return new ServiceResponse<List<GetCommentDTO>>
                {
                    Data = commentDtos,
                    Message = "Ok",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<List<GetCommentDTO>>
                {
                    Data = null,
                    Message = $"Problem with database: {ex.Message}",
                    Success = false
                };
            }

        }
        public async Task<ServiceResponse<PaginatedResult<GetCommentDTO>>> SearchCommentsAsync(int movieId, string text, int page, int pageSize)
        {
            try
            {

                IQueryable<Comment> query = _dataContext.Comments.Include(c => c.User).Where(c => c.MovieId == movieId);

                if (!string.IsNullOrEmpty(text))
                {
                    query = query.Where(c => EF.Functions.Like(c.Text, $"%{text}%"));
                }

                var totalRecords = await query.CountAsync();

                var comments = await query
                    .OrderByDescending(c => c.Timestamp)
                    .Skip(pageSize * (page - 1))
                    .Take(pageSize)
                    .ToListAsync();

                var commentsDTO = _mapper.Map<List<GetCommentDTO>>(comments);
                var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

                var response = new ServiceResponse<PaginatedResult<GetCommentDTO>>()
                {
                    Data = new PaginatedResult<GetCommentDTO>
                    {
                        PageContent = commentsDTO,
                        TotalRecords = totalRecords,
                        PageSize = pageSize,
                        CurrentPage = page
                    },
                    Message = "Ok",
                    Success = true
                };

                return response;
            }
            catch (Exception ex)
            {

                return new ServiceResponse<PaginatedResult<GetCommentDTO>>()
                {
                    Data = null,
                    Message = $"Problem with the database: {ex.Message}",
                    Success = false
                };
            }
        }



    }



}
