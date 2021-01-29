using CommuniTea.Models;
using System.Collections.Generic;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Repositories
{
    public interface IQuestionRepository
    {
        List<QuestionViewModel> Get();
        List<Question> GetWithAnswers();
    }
}