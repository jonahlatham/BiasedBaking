using System.Collections.Generic;
using System.Linq;

using biasedBaking.Data;
using biasedBaking.Models;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace biasedBaking.Controllers
{
    [ApiController]
    [Route ("[controller]")]
    public class VoteController : ControllerBase
    {

        private CoreContext _context;
        private readonly ILogger<VoteController> _logger;
        public VoteController (ILogger<VoteController> logger, CoreContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [Route ("vote")]
        public IActionResult makeVote ([FromBody] VoteRequests x)
        {
            var crappers = _context.Vote.Where(y=>y.UserId == x.Votes.FirstOrDefault().UserId);
            if(crappers.Count()>0)
            {
                return Ok("");
            }

            var newVote = x.Votes.Select (o => new biasedBaking.Data.Entities.Vote ()
            {
                UserId = o.UserId,
                    PieId = o.PieId,
                    ElectionId = 1,
                    Rank = o.Rank
            });
            _context.Vote.AddRange (newVote);
            _context.SaveChanges ();
            return Ok ("Good to go");
        }

        [HttpGet]
        [Route ("vote")]
        public List<Vote> getVote ()
        {
            return _context.Vote.Select (e => new Vote ()
            {
                Id = e.Id,
                    UserId = e.UserId,
                    PieId = e.PieId,
                    ElectionId = e.ElectionId,
                    Rank = e.Rank
            }).OrderBy (w => w.Id).ToList ();
        }

        [HttpGet]
        [Route ("results")]
        public List<Pie> getResults ()
        {
            var myResults = _context.Pie.Select (e => new Pie ()
            {
                Id = e.Id,
                    Name = e.Name,
                    User = e.User.Name,
                    Votes = e.Votes.Select (x => new Vote ()
                    {
                        Rank = x.Rank,
                            Username = x.User.Name
                    }).ToList ()
            }).ToList ();
            return myResults;
        }

        [HttpPost]
        [Route ("grantAccess")]

        public IActionResult grantAccess (Election x)
        {
            var myResults = _context.Election.FirstOrDefault ();
            myResults.IsActive = x.IsActive;
            _context.SaveChanges ();
            return Ok ("Good to go");
        }
        
        [HttpGet]
        [Route ("grantAccess")]
        public bool getAccess ()
        {
            return _context.Election.FirstOrDefault().IsActive;
        }
    }
}