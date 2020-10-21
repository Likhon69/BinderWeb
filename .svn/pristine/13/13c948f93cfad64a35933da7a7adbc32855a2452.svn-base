using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class DealerInformation
    {
        public DealerInformation()
        {
            DealerWithLocationMapping = new HashSet<DealerWithLocationMapping>();
        }

        public int DealerId { get; set; }
        public string DealerCode { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public int? DealerTypeId { get; set; }
        public string Agrementfile { get; set; }
        public bool? IsActive { get; set; }
        public string DealerName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? BranchId { get; set; }

        public virtual ICollection<DealerWithLocationMapping> DealerWithLocationMapping { get; set; }
    }
}
