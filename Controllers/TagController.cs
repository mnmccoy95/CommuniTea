using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CommuniTea.Models;
using CommuniTea.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommuniTea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TagController : ControllerBase
    {
        private ITagRepository _tagRepo;
        private IUserProfileRepository _userProfileRepo;

        public TagController(ITagRepository tagRepo, IUserProfileRepository userProfileRepo)
        {
            _tagRepo = tagRepo;
            _userProfileRepo = userProfileRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var tags = _tagRepo.Get();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var tag = _tagRepo.GetById(id);
            return Ok(tag);
        }

        [HttpGet("{name}")]
        public IActionResult GetByName(string name)
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var tag = _tagRepo.GetByName(name);
            return Ok(tag);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }

    }
}