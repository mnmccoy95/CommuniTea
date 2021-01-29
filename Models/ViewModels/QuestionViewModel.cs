using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models.ViewModels
{
    public class QuestionViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int QuestionTypeId { get; set; }
        public QuestionType QuestionType { get; set; }
        public List<AnswerViewModel> Answers { get; set; }
    }
}
