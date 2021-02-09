using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
