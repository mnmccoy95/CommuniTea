using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommuniTea.Models.ViewModels
{
    public class UserProfileSummary
    {
        public int Id { get; set; }
        public string ImageLocation { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Pronouns { get; set; }
    }
}
