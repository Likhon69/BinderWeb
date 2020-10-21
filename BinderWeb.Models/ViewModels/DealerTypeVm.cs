using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.ViewModels
{
    public class DealerTypeVm
    {
        public int DealerTypeId { get; set; }
        public string DealerName { get; set; }
        public int? Status { get; set; }
        public int? CreateBy { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? UpdateBy { get; set; }
        public DateTime? UpdateDate { get; set; }
    }
}
