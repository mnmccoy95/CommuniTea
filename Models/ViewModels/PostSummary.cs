using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models.ViewModels
{
    public class PostSummary
    {
        public int Id { get; set; }
        public string ImageLocation { get; set; }
        public string Context { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImg { get; set; }
        public List<PostTag> PostTag { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
