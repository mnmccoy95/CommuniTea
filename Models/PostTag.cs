using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommuniTea.Models
{
    [Table("posttag")]
    public class PostTag
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("postid")]
        public int PostId { get; set; }
        public Post Post { get; set; }
        [Column("tagid")]
        public int TagId { get; set; }
        public Tag Tag { get; set; }
    }
}
