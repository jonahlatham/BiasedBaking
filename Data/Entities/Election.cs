using System;
using System.Collections.Generic;

namespace biasedBaking.Data.Entities
{
    public partial class Election
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}