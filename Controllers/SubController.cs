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

namespace CommuniTea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SubController : ControllerBase
    {
        private ISubRepository _subRepo;
        private IUserProfileRepository _userRepo;

        public SubController(ISubRepository subRepo, IUserProfileRepository userRepo)
        {
            _subRepo = subRepo;
            _userRepo = userRepo;
        }

        [HttpGet("getbyuser/{userProfileId}")]
        public IActionResult GetById(int userProfileId)
        {
            if (GetCurrentUserProfile().Id != userProfileId)
            {
                return null;
            }

            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            List<Sub> subs = _subRepo.GetByUserId(userProfileId);
            if (subs != null)
            {
                return Ok(subs);
            }
            else
            {
                return null;
            }
        }

        [HttpGet("getsubs/{userProfileId}")]
        public IActionResult GetSubs(int userProfileId)
        {
            if (GetCurrentUserProfile().Id != userProfileId)
            {
                return null;
            }
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            List<SubscriptionVM> subs = _subRepo.GetSubscribedPosts(userProfileId);
            if (subs != null)
            {
                return Ok(subs);
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        public IActionResult Post(Sub subscription)
        {
            var currentUser = GetCurrentUserProfile();

            if (currentUser.Id != subscription.SubscriberUserProfileId)
            {
                return NotFound();
            }
            if (GetCurrentUserProfile().Approved != 1)
            {
                return BadRequest();
            }

            _subRepo.Add(subscription);
            return NoContent();
        }

        [HttpDelete("{providerUserProfileId}/{subscriberUserProfileId}")]
        public IActionResult Delete(int providerUserProfileId, int subscriberUserProfileId)
        {
            var user = GetCurrentUserProfile();
            var subToDelete = _subRepo.GetByUsers(providerUserProfileId, subscriberUserProfileId);

            if (subToDelete.SubscriberUserProfileId != user.Id)
            {
                return Unauthorized();
            }
            if (user.Approved != 1)
            {
                return BadRequest();
            }

            _subRepo.Delete(subToDelete);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
