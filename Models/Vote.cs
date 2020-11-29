using System.Collections.Generic;

namespace biasedBaking.Models
{
    public class VoteRequests
    {
        public List<Vote> Votes { get; set; }
    }
    public class Vote
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PieId { get; set; }
        public int ElectionId { get; set; }
        public int Rank { get; set; }
        public string Username { get; set; }
    }
}