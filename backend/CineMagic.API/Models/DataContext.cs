using Microsoft.EntityFrameworkCore;
using CineMagic.Shared.Models;
using CineMagic.DataSeeder;
using CineMagic.Shared.Auth;
namespace CineMagic.API.Models
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<MovieRating> MovieRatings { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {


            modelBuilder.Entity<Movie>()
             .HasKey(m => m.Id);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Title)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Movie>()
                .Property(m => m.Director)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Movie>()
                 .Property(m => m.ImageUrl)
                 .HasMaxLength(2000);

            // Movie to User
            modelBuilder.Entity<Movie>()
                    .HasOne(m => m.CreatedByUser)
                    .WithMany(u => u.CreatedMovies)
                    .HasForeignKey(m => m.CreatedByUserId)
                    .OnDelete(DeleteBehavior.SetNull);

            // Movie to Comments
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Movie)
                .WithMany(m => m.Comments)
                .HasForeignKey(c => c.MovieId);

            // User to Comments
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId);


            // Movie to Ratings
            modelBuilder.Entity<MovieRating>()
                .HasOne(mr => mr.Movie)
                .WithMany(m => m.Ratings)
                .HasForeignKey(mr => mr.MovieId);

            // User to Ratings
            modelBuilder.Entity<MovieRating>()
                .HasOne(mr => mr.User)
                .WithMany(u => u.Ratings)
                .HasForeignKey(mr => mr.UserId);

           
        }
    }
}
