﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class ProductPriceTemp
    {
        public int ProductPriceId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? PricingDate { get; set; }
        public int? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? StateId { get; set; }
        public decimal? FirstSlotPrice { get; set; }
        public decimal? SecondSlotPrice { get; set; }
    }
}