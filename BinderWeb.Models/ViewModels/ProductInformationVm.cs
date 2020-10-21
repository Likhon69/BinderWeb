using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.ViewModels
{
    public class ProductInformationVm
    {
        public int ProductId { get; set; }
        public string ProductCode { get; set; }
        public int? UnitId { get; set; }
        public int? Status { get; set; }
        public string ProductName { get; set; }
        public string UnitName { get; set; }
    }
}
