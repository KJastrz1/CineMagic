using AutoMapper;
using CineMagic.Shared.Models;
namespace CineMagic.Shared.Mappers
{
    public class MovieMapper : Profile
    {
        public MovieMapper()
        {

            CreateMap<CreateUpdateMovieDTO, Movie>();
            CreateMap<Movie, GetMovieDetailsDTO>();
            CreateMap<Movie, GetMoviePartialDTO>();
            CreateMap<CreateCommentDTO, Comment>();
            CreateMap<UpdateCommentDTO, Comment>();
            CreateMap<Comment, GetCommentDTO>()
          .ForMember(dto => dto.Username, opt => opt.MapFrom(c => c.User.Username));
            CreateMap<UserRatingDTO, MovieRating>();
            CreateMap<MovieRating, UserRatingDTO>();
            CreateMap<Movie, MovieRatingDTO>();

        }
    }
}
