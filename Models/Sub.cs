using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommuniTea.Models
{
    [Table("subs")]
    public class Sub
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("subscriberuserprofileid")]
        public int SubscriberUserProfileId { get; set; }
        [Column("provideruserprofileid")]
        public int ProviderUserProfileId { get; set; }
        public UserProfile SubscriberUserProfile { get; set; }
        public UserProfile ProviderUserProfile { get; set; }
    }
}
