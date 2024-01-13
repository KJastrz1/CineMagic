using System;
using CineMagic.Shared.Auth;

namespace CineMagic.Shared.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public DateTime Timestamp { get; set; } = DateTime.Now;
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
    }
}
