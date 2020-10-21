
using System;
using System.Collections.Generic;
using System.Text;

namespace Binder.NotificationService.Model
{
    public class OtpMessageDto
    {
        public int DealerId { get; set; }
        public int UserId { get; set; }
        public string LoginId { get; set; }
        public string OTP { get; set; }
        public int ValidMinutes { get; set; }
        public DateTime GenerateTime { get; set; }
        public int UserOtpId { get; set; }
        public string UserName { get; set; }

    }
}
