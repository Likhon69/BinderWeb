using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BinderWebApi.Models
{
    public class DealerInformationDto
    {
        public int DealerId { get; set; }
        public string DealerCode { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public int? DealerTypeId { get; set; }
        public IFormFile Agrementfilef { get; set; }
        public string Agrementfile { get; set; }
        public bool? IsActive { get; set; }
        public string DealerName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
