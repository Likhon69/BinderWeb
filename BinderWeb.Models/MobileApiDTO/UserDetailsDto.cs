using System;
using System.Collections.Generic;
using System.Text;

namespace BinderWeb.Models.MobileApiDTO
{
    public class UserDetailsDto
    {
        public int UserId { get; set; }
        public int DealerId { get; set; }
        public string UserName { get; set; }
        public string DealerCode { get; set; }
        public string LoginId { get; set; }
        public string MobileNo { get; set; }
        public string EmailAddress { get; set; }
        public int TotalOrder { get; set; }
        public int TotalCompleted { get; set; }
        public int TotalCanceled { get; set; }
        public IList<LocationDto> Location { get; set; }

    }
}
