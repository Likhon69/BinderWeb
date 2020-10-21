using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.MobileApiDTO
{
    public class BankBranchDto
    {
        public int BranchId { get; set; }
        public string BranchCode { get; set; }
        public int? BankId { get; set; }
        public string BranchName { get; set; }
        public string Address { get; set; }
        public int? IsActive { get; set; }
    }
}
