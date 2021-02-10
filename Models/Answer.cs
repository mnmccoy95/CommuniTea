using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models
{
    [Table("answer")]
    public class Answer
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("content")]
        public string Content { get; set; }
        [Column("correct")]
        public bool Correct { get; set; }
        [Column("questionid")]
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
