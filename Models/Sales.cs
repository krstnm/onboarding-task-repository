using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace StoreWebApp.Models
{
    public partial class Sales
    {
        [JsonProperty("salesId")]
        public int SalesId { get; set; }
        [JsonProperty("productId")]
        public int? ProductId { get; set; }
        [JsonProperty("customerId")]
        public int? CustomerId { get; set; }
        [JsonProperty("storeId")]
        public int? StoreId { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [JsonProperty("dateSold")]
        public DateTime? DateSold { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
