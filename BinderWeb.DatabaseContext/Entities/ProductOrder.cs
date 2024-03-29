﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class ProductOrder
    {
        public int OrderId { get; set; }
        public int? DealerId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? Orderdate { get; set; }
        public int? SlotId { get; set; }
        public decimal? UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        public int? LocationId { get; set; }
        public DateTime? PickupDate { get; set; }
        public int? BagTypeId { get; set; }
        public int? StateId { get; set; }
        public string OrderNo { get; set; }
        public int? ProductPriceId { get; set; }
        public string Soc { get; set; }
        public string Remarks { get; set; }
        public DateTime? SocConfirmationDate { get; set; }
    }
}
