using CommuniTea.Models;
using System.Collections.Generic;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Repositories
{
    public interface ISubRepository
    {
        void Add(Sub sub);
        List<Sub> GetByUserId(int userId);
        List<SubscriptionVM> GetSubscribedPosts(int userId);
        public void Delete(Sub sub);
        public Sub GetByUsers(int providerId, int subscriberId);
    }
}