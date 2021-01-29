using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int QuestionTypeId { get; set; }
        public QuestionType QuestionType { get; set; }
        public List<Answer> Answer { get; set; }
        public List<AnswerViewModel> AnswerViewModel { get; set; }
    }
}
