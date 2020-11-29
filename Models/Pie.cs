using System.Collections.Generic;

namespace biasedBaking.Models
{
    public class Pie

    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public string User { get; set; }
        public List<Vote> Votes { get; set; }
    }
}