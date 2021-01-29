using CommuniTea.Models;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAll();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Update(UserProfile userProfile);
    }
}