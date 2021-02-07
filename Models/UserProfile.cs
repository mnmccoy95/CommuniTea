using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string ImageLocation { get; set; }
        public string Bio { get; set; }
        public string Pronouns { get; set; }
        public string FirebaseUserId { get; set; }
        public int Approved { get; set; }
        public List<Post> Post { get; set; }
        public List<Inspiration> Inspiration { get; set; }
        public List<Sub> Sub { get; set; }
        public int StyleId { get; set; }
    }
}
