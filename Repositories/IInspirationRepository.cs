using CommuniTea.Models;
using CommuniTea.Models.ViewModels;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface IInspirationRepository
    {
        void Add(Inspiration inspiration);
        void Delete(int id);
        List<PostSummary> GetInspirationsByUserId(int id);
        public Inspiration GetByPostAndUser(int id, int userId);
    }
}