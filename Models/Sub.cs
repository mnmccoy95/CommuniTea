using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models
{
    public class Sub
    {
        public int Id { get; set; }
        public int SubscriberUserProfileId { get; set; }
        public int ProviderUserProfileId { get; set; }
        public UserProfile SubscriberUserProfile { get; set; }
        public UserProfile ProviderUserProfile { get; set; }
    }
}
