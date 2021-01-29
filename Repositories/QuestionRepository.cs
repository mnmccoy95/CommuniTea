using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Data;
using CommuniTea.Models;
using CommuniTea.Models.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CommuniTea.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private ApplicationDbContext _context;
        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<QuestionViewModel> Get()
        {
            return _context.Question
                .Select(q => new QuestionViewModel()
                {
                    Id = q.Id,
                    Content = q.Content,
                    QuestionType = q.QuestionType,
                    Answers = q.Answer.Select(a => new AnswerViewModel()
                    { 
                        Id = a.Id,
                        Content = a.Content

                    }).ToList()
                })
                .ToList();
        }

        public List<Question> GetWithAnswers()
        {
            return _context.Question
                .Include(q => q.QuestionType)
                .Include(q => q.Answer).ToList();
        }
    }
}
