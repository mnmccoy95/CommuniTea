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
    public class InspirationRepository : IInspirationRepository
    {
        private ApplicationDbContext _context;
        public InspirationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostSummary> GetInspirationsByUserId(int id)
        {
            return _context.Inspiration
                .Include(i => i.Post).ThenInclude(p => p.UserProfile)
                .Include(i => i.Post).ThenInclude(p => p.Comments).ThenInclude(c => c.UserProfile)
                .Include(i => i.Post).ThenInclude(p => p.PostTag).ThenInclude(pt => pt.Tag)
                .Where(i => i.UserProfileId == id)
                .Select(i => new PostSummary()
                {
                    Id = i.Post.Id,
                    ImageLocation = i.Post.ImageLocation,
                    AuthorId = i.Post.UserProfileId,
                    AuthorName = i.Post.UserProfile.DisplayName,
                    AuthorImg = i.Post.UserProfile.ImageLocation,
                    Context = i.Post.Content,
                    PostTag = i.Post.PostTag,
                    Comments = i.Post.Comments
                })
                .ToList();
        }

        public Inspiration GetByPostAndUser(int id, int userId)
        {
            return _context.Inspiration
                .FirstOrDefault(i => i.PostId == id && i.UserProfileId == userId);
        }

        public void Add(Inspiration inspiration)
        {
            _context.Add(inspiration);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            Inspiration insp = _context.Inspiration.FirstOrDefault(i => i.Id == id);
            _context.Inspiration.Remove(insp);
            _context.SaveChanges();
        }
    }
}
