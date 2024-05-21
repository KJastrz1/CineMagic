using System;
using CineMagic.Shared.Auth;

namespace CineMagic.Shared.Models
{
    public class CreateCommentDTO
    {
        public string Text { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }

    }
}
