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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommuniTea.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _repo;
        private readonly IQuestionRepository _questionRepo;
        private readonly IAnswerRepository _answerRepo;
        public UserProfileController(IUserProfileRepository repo, IQuestionRepository questionRepo, IAnswerRepository answerRepo)
        {
            _repo = repo;
            _questionRepo = questionRepo;
            _answerRepo = answerRepo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var user = _repo.GetByFirebaseUserId(firebaseUserId);
            if (user.Approved == 0)
            {
                return BadRequest();
            }
            else
            {
                return Ok(user);
            }

        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.Approved = 2;
            _repo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPost("answer")]
        public IActionResult GetAcceptance(int[] answers)
        {
            if (GetCurrentUserProfile().Approved == 1 || GetCurrentUserProfile().Approved == 0)
            {
                return BadRequest();
            }

            var answerList = _answerRepo.Get();
            int acceptance = 1;
            foreach(int id in answers)
            {
                foreach(Answer a in answerList)
                {
                    if(a.Id == id && a.Correct == false)
                    {
                        acceptance = 0;
                    }
                }
            }

            var user = GetCurrentUserProfile();
            user.Approved = acceptance;
            _repo.Update(user);
            return Ok(user);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}