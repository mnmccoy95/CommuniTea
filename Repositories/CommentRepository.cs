using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Data;
using CommuniTea.Models;
using CommuniTea.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CommuniTea.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Comment GetById(int id)
        {
            return _context.Comment.Include(c => c.UserProfile).FirstOrDefault(c => c.Id == id);
        }

        public List<Comment> GetByPostId(int postId)
        {
            return _context.Comment.Include(c => c.UserProfile).Where(c => c.PostId == postId).ToList();
        }

        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }

        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(Comment comment)
        {
            _context.Comment.Remove(comment);
            _context.SaveChanges();
        }
    }
}
