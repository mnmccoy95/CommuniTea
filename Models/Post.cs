using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommuniTea.Models
{
    [Table("post")]
    public class Post
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public string ImageLocation { get; set; }
        public string Content { get; set; }
        public List<PostTag> PostTag { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
