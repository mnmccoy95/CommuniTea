using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CommuniTea.Models;
using CommuniTea.Repositories;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repo;
        private readonly IPostRepository _postRepo;
        private readonly IUserProfileRepository _userProfileRepo;
        public CommentController(ICommentRepository repo, IUserProfileRepository userRepo, IPostRepository postRepo)
        {
            _repo = repo;
            _postRepo = postRepo;
            _userProfileRepo = userRepo;
        }

        [HttpGet("{postId}")]
        public IActionResult GetByPostId(int postId)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Approved != 1)
            {
                return BadRequest();
            }

            var comments = _repo.GetByPostId(postId);

            return Ok(comments);
        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Approved != 1)
            {
                return BadRequest();
            }

            comment.UserProfileId = currentUser.Id;

            _repo.Add(comment);
            var comments = _repo.GetByPostId(comment.PostId);
            return Ok(comments);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();
            if (user.Approved != 1)
            {
                return BadRequest();
            }

            if (user.Id != comment.UserProfileId)
            {
                return Unauthorized();
            }

            _repo.Update(comment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var user = GetCurrentUserProfile();
            if (user.Approved != 1)
            {
                return BadRequest();
            }
            var commentToDelete = _repo.GetById(id);
            var postId = commentToDelete.PostId;

            if (commentToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            _repo.Delete(commentToDelete);
            var comments = _repo.GetByPostId(postId);
            return Ok(comments);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
