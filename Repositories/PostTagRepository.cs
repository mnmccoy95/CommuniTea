using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Data;
using CommuniTea.Models;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Repositories
{
    public class PostTagRepository : IPostTagRepository
    {
        private ApplicationDbContext _context;
        public PostTagRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostTag> GetAll()
        {
            return _context.PostTag
                .Include(pt => pt.Post)
                .Include(pt => pt.Tag)
                .OrderBy(pt => pt.Tag.Name).ToList();
        }
        public PostTag GetById(int id)
        {
            return _context.PostTag
                .Include(pt => pt.Post)
                .Include(pt => pt.Tag)
                .FirstOrDefault(pt => pt.Id == id);
        }

        public List<PostTag> GetByPostId(int id)
        {
            return _context.PostTag.Include(pt => pt.Tag).Where(pt => pt.Post.Id == id).ToList();
        }

        public void Delete(int id)
        {
            PostTag postTag = _context.PostTag.FirstOrDefault(pt => pt.Id == id);
            _context.PostTag.Remove(postTag);
            _context.SaveChanges();
        }

        public void Add(PostTag postTag)
        {
            _context.Add(postTag);
            _context.SaveChanges();
        }
    }
}