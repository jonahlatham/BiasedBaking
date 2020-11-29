using System;
using System.Collections.Generic;

namespace biasedBaking.Data.Entities
{
    public partial class Vote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PieId { get; set; }
        public int ElectionId { get; set; }
        public int Rank { get; set; }
        public User User { get; set; }
    }
}