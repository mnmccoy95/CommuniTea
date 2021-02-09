using CommuniTea.Models;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface ICommentRepository
    {
        void Add(Comment comment);
        void Delete(Comment comment);
        Comment GetById(int id);
        void Update(Comment comment);
        public List<Comment> GetByPostId(int postId);
    }
}