using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommuniTea.Models
{
    [Table("inspiration")]
    public class Inspiration
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("userprofileid")]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        [Column("postid")]
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}
