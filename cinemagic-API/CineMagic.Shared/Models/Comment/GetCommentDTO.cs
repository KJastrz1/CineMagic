using System;
using CineMagic.Shared.Auth;

namespace CineMagic.Shared.Models
{
    public class GetCommentDTO
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public DateTime Timestamp { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }

        public string? Username { get; set; }
    }
}
