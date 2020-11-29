using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using biasedBaking.Data;
using biasedBaking.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace biasedBaking.Controllers
{
    [ApiController]
    [Route ("[controller]")]
    public class UserController : ControllerBase
    {

        private CoreContext _context;
        private readonly ILogger<User> _logger;
        public UserController (ILogger<User> logger, CoreContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [Route ("register")]
        public User addUser (User x)
        {
            if (_context.User.Any (y => y.Name == x.Name))
            {
                return null;
            }
            if (_context.User.Count () > 12)
            {
                return null;
            }

            var newUser = new Data.Entities.User ()
            {
                Name = x.Name,
            };
            _context.User.Add (newUser);
            _context.SaveChanges ();
            return _context.User.Where (w => w.Id == newUser.Id).Select (e => new User ()
            {
                Id = e.Id,
                    Name = e.Name
            }).FirstOrDefault ();
        }

        [HttpPost]
        [Route ("login")]
        public User findUser (User x)
        {
            var singleUser = _context.User.SingleOrDefault (w => w.Name.ToLower() == x.Name.ToLower());
            if (singleUser == null)
            {
                return null;
            }
            return new User ()
            {
                Id = singleUser.Id,
                    Name = singleUser.Name
            };
        }

        [HttpPost]
        [Route ("pie")]
        public Pie addPie (Pie x)
        {
            if (_context.User.Count () > 12)
            {
                return null;
            }
            var newPie = new Data.Entities.Pie ()
            {
                Name = x.Name,
                UserId = x.UserId
            };
            _context.Pie.Add (newPie);
            _context.SaveChanges ();
            return _context.Pie.Where (w => w.Id == newPie.Id).Select (e => new Pie ()
            {
                Id = e.Id,
                    Name = e.Name
            }).FirstOrDefault ();
        }

        [HttpGet]
        [Route ("pie")]
        public List<Pie> getPie ()
        {
            return _context.Pie.Select (e => new Pie ()
            {
                Id = e.Id,
                    Name = e.Name,
                    UserId = e.UserId,
                    User = e.User.Name
            }).OrderBy (w => w.Id).ToList ();
        }
    }
}