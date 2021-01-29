using CommuniTea.Models;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface IPostTagRepository
    {
        void Add(PostTag postTag);
        void Delete(int id);
        List<PostTag> GetAll();
        PostTag GetById(int id);
        List<PostTag> GetByPostId(int id);
    }
}