using System;
using System.Collections.Generic;

namespace StoreWebApp.Models
{
    public partial class Students
    {
        public int StudentId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}
