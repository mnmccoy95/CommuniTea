using CommuniTea.Models;
using System.Collections.Generic;

namespace CommuniTea.Repositories
{
    public interface IAnswerRepository
    {
        List<Answer> Get();
    }
}