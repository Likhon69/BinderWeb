using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.ViewModels
{
    public class ProductOrderVm
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
        public int? OrderNo { get; set; }
        public string Remarks { get; set; }
        public string Soc { get; set; }

    
        public bool IsScb { get; set; }
        public int? BankId { get; set; }
        public int? BankBranchId { get; set; }
        public string ChequeNo { get; set; }
        public string AttachmentId { get; set; }

        public DateTime? ChequeDate { get; set; }
        public DateTime DepositDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
    }
}
