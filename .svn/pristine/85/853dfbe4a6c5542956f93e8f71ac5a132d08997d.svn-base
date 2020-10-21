using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.ViewModels
{
    public class TallyPointDto
    {

        public int TallyPointId { get; set; }
        public int OrderId { get; set; }

        public int DisburseQuantity { get; set; }
        public int? UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string Remarks { get; set; }
        public int OrderedQuantity { get; set; }
        public int DeliveredQuantity { get; set; }
        public int BalanceQty { get { return OrderedQuantity - DeliveredQuantity; } }

    }
}
