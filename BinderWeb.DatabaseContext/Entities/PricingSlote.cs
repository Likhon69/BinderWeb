using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class PricingSlote
    {
        public int SlotId { get; set; }
        public DateTime? FromTime { get; set; }
        public DateTime? ToTime { get; set; }
    }
}
