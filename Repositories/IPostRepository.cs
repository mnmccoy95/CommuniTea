using CommuniTea.Models;
using CommuniTea.Models.ViewModels;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        void Delete(int id);
        List<PostSummary> Get();
        Post GetById(int id);
        List<PostTag> GetByTagId(int tagId);
        List<PostSummary> GetByUserProfileId(int id);
        void Update(Post post);
    }
}