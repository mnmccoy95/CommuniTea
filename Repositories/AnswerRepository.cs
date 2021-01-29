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
    public class AnswerRepository : IAnswerRepository
    {
        private ApplicationDbContext _context;
        public AnswerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Answer> Get()
        {
            return _context.Answer.ToList();
        }
    }
}
