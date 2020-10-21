using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class Bank
    {
        public int BankId { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }
        public int? IsActive { get; set; }
    }
}
