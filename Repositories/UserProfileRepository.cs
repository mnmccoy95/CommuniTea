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
    public class UserProfileRepository : IUserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public List<UserProfile> GetAll()
        {
            return _context.UserProfile.OrderBy(up => up.DisplayName).ToList();
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
        public void Update(UserProfile userProfile)
        {
            _context.Entry(userProfile).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public List<UserProfileSummary> GetById(int id)
        {
            return _context.UserProfile.Where(p => p.Id == id)
                .Select(up => new UserProfileSummary()
                {
                    Id = up.Id,
                    ImageLocation = up.ImageLocation,
                    DisplayName = up.DisplayName,
                    Bio = up.Bio,
                    Pronouns = up.Pronouns
                }).ToList();
        }

    }
}