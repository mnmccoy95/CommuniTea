using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommuniTea.Models
{
    [Table("userprofile")]
    public class UserProfile
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("displayname")]
        public string DisplayName { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("imagelocation")]
        public string ImageLocation { get; set; }
        [Column("bio")]
        public string Bio { get; set; }
        [Column("pronouns")]
        public string Pronouns { get; set; }
        [Column("firebaseuserid")]
        public string FirebaseUserId { get; set; }
        [Column("approved")]
        public int Approved { get; set; }
        public List<Post> Post { get; set; }
        public List<Inspiration> Inspiration { get; set; }
        public List<Sub> Sub { get; set; }
        [Column("styleid")]
        public int StyleId { get; set; }
    }
}
