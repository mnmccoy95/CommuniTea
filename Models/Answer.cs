using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models
{
    public class Answer
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool Correct { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
