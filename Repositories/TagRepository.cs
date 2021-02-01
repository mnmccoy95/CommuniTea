using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Data;
using CommuniTea.Models;
using Microsoft.EntityFrameworkCore;

namespace CommuniTea.Repositories
{
    public class TagRepository : ITagRepository
    {
        private ApplicationDbContext _context;
        public TagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Tag> Get()
        {
            return _context.Tag.ToList();
        }
        public Tag GetById(int id)
        {
            return _context.Tag.FirstOrDefault(p => p.Id == id);
        }
        public Tag GetByName(string name)
        {
            return _context.Tag.FirstOrDefault(t => t.Name == name);
        }
        public void Add(Tag tag)
        {
            _context.Add(tag);
            _context.SaveChanges();
        }
    }
}