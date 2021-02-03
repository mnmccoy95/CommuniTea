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
    public class InspirationController : ControllerBase
    {
        private readonly IInspirationRepository _repo;
        private readonly IUserProfileRepository _userRepo;
        public InspirationController(IInspirationRepository repo, IUserProfileRepository userRepo)
        {
            _repo = repo;
            _userRepo = userRepo;
        }

        [HttpGet("{id}")]
        public IActionResult GetUserInsp(int id)
        {
            var insp = _repo.GetInspirationsByUserId(id);
            if (insp == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(insp);
            }

        }
        [HttpPost]
        public IActionResult Post(Inspiration inspiration)
        {
            var currentUser = GetCurrentUserProfile();

            inspiration.UserProfileId = currentUser.Id;

            _repo.Add(inspiration);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var inspToDelete = _repo.GetByPostAndUser(id, user.Id);

            if (inspToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }

            _repo.Delete(inspToDelete.Id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
