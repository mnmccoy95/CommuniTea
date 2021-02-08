using CommuniTea.Models;
using CommuniTea.Models.ViewModels;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAll();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Update(UserProfile userProfile);
        List<UserProfileSummary> GetById(int id);
        
    }
}