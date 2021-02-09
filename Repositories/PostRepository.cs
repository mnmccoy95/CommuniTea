using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Models;
using CommuniTea.Data;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Repositories
{
    public class PostRepository : IPostRepository
    {
        private ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<PostSummary> Get()
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.Comments).ThenInclude(c => c.UserProfile)
                .Include(p => p.PostTag).ThenInclude(pt => pt.Tag)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AuthorImg = p.UserProfile.ImageLocation,
                    Context = p.Content,
                    PostTag = p.PostTag,
                    Comments = p.Comments
                }).OrderByDescending(p => p.Id).ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                .Include(p => p.UserProfile)
                .Include(p => p.PostTag)
                .Include(p => p.Comments)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var post = GetById(id);

            var tags = post.PostTag;

            var insp = _context.Inspiration.Where(i => i.PostId == id).ToList();

            var comment = _context.Comment.Where(c => c.PostId == id).ToList();

            foreach(Comment c in comment)
            {
                _context.Comment.Remove(c);
            }

            foreach(Inspiration i in insp)
            {
                _context.Inspiration.Remove(i);
            }
            
            foreach (PostTag tag in tags)
            {
                _context.PostTag.Remove(tag);
            }

            _context.Post.Remove(post);
            _context.SaveChanges();
        }

        public List<PostSummary> GetByUserProfileId(int id)
        {
            return _context.Post
                .Include(p => p.PostTag).ThenInclude(pt => pt.Tag)
                .Include(p => p.Comments).ThenInclude(c => c.UserProfile)
                .Where(p => p.UserProfileId == id)
                .Select(p => new PostSummary()
                {
                    Id = p.Id,
                    ImageLocation = p.ImageLocation,
                    AuthorId = p.UserProfileId,
                    AuthorName = p.UserProfile.DisplayName,
                    AuthorImg = p.UserProfile.ImageLocation,
                    Context = p.Content,
                    PostTag = p.PostTag,
                    Comments = p.Comments
                })
                .ToList();
        }


        public List<PostTag> GetByTagName(string name)
        {
            return _context.PostTag
                .Where(pt => pt.Tag.Name == name)
                .Include(pt => pt.Post).ThenInclude(p => p.PostTag).ThenInclude(pt => pt.Tag)
                .Include(pt => pt.Post).ThenInclude(p => p.Comments).ThenInclude(c => c.UserProfile)
                .Include(pt => pt.Post.UserProfile)
                .ToList();
        }
    }
}
