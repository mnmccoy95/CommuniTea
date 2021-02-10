using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommuniTea.Models
{
    [Table("questiontype")]
    public class QuestionType
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
