using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommuniTea.Models.ViewModels;

namespace CommuniTea.Models.ViewModels
{
    public class SubscriptionVM
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImg { get; set; }
        public List<PostSummary> PostSummary { get; set; }
    }
}
