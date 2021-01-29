using CommuniTea.Models;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        List<Tag> Get();
        Tag GetById(int id);
        Tag GetByName(string name);
    }
}