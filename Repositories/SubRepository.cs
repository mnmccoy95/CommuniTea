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
    public class SubRepository : ISubRepository
    {
        private ApplicationDbContext _context;
        public SubRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Sub> GetByUserId(int userId)
        {
            return _context.Subs.Where(sub => sub.SubscriberUserProfileId == userId).ToList();
        }
        public void Add(Sub sub)
        {
            _context.Add(sub);
            _context.SaveChanges();
        }

        public List<SubscriptionVM> GetSubscribedPosts(int userId)
        {
            return _context.Subs
                .Include(s => s.ProviderUserProfile).ThenInclude(u => u.Post).ThenInclude(p => p.PostTag).ThenInclude(pt => pt.Tag)
                .Include(s => s.ProviderUserProfile).ThenInclude(u => u.Post).ThenInclude(p => p.Comments).ThenInclude(c => c.UserProfile)
                .Where(s => s.SubscriberUserProfileId == userId)
                .Select(s => new SubscriptionVM()
                {
                    Id = s.Id,
                    AuthorId = s.ProviderUserProfileId,
                    AuthorName = s.ProviderUserProfile.DisplayName,
                    AuthorImg = s.ProviderUserProfile.ImageLocation,
                    PostSummary = s.ProviderUserProfile.Post.Select(p => new PostSummary()
                    { 
                        Id = p.Id,
                        ImageLocation = p.ImageLocation,
                        Context = p.Content,
                        PostTag = p.PostTag,
                        Comments = p.Comments

                    }).ToList()
                })
                .ToList();
        }
        public Sub GetByUsers(int providerId, int subscriberId)
        {
            return _context.Subs.FirstOrDefault(s => s.ProviderUserProfileId == providerId && s.SubscriberUserProfileId == subscriberId);
        }
        public void Delete(Sub sub)
        {
            _context.Subs.Remove(sub);
            _context.SaveChanges();
        }
    }
}
