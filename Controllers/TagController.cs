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

        public TagController(ITagRepository tagRepo)
        {
            _tagRepo = tagRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var tags = _tagRepo.Get();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var tag = _tagRepo.GetById(id);
            return Ok(tag);
        }

        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            _tagRepo.Add(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

    }
}