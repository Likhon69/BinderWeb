using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class TallyPoint
    {
        public int TallyPointId { get; set; }
        public int? OrderId { get; set; }
        public int? DisburseQuantity { get; set; }
        public int? UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Remarks { get; set; }
        public int? OrderedQuantity { get; set; }
        public int? DeliveredQuantity { get; set; }
    }
}
