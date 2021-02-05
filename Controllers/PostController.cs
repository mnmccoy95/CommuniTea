using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CommuniTea.Models;
using CommuniTea.Models.ViewModels;
using CommuniTea.Repositories;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostController : ControllerBase
    {

        private IPostRepository _repo;
        private IUserProfileRepository _userRepo;

        public PostController(IPostRepository repo, IUserProfileRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }


        [HttpGet]
        public IActionResult Get()
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var posts = _repo.Get();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }
            var post = _repo.GetById(id);
            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpGet("search/{name}")]
        public IActionResult GetByTagId(string name)
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var posts = _repo.GetByTagName(name);
            if (posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var posts = _repo.GetByUserProfileId(id);
            return Ok(posts);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {

            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            var currentUser = GetCurrentUserProfile();

            post.UserProfileId = currentUser.Id;

            _repo.Add(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var user = GetCurrentUserProfile();
            if (user.Approved != 1)
            {
                return BadRequest();
            }
            var postToDelete = _repo.GetById(id);

            if (postToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PostSummary postSummary)
        {
            if (id != postSummary.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();
            if (user.Approved != 1)
            {
                return BadRequest();
            }

            if (user.Id != postSummary.AuthorId)
            {
                return Unauthorized();
            }
            Post post = _repo.GetById(postSummary.Id);
            post.Content = postSummary.Context;
            _repo.Update(post);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }

    }
}