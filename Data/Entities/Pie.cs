using System;
using System.Collections.Generic;

namespace biasedBaking.Data.Entities
{
    public partial class Pie
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Vote> Votes { get; set; }
    }
}