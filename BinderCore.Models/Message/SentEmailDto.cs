using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.Models.Message
{
    public class SentEmailDto
    {
        public int SentEmailId { get; set; }
        public string EmailFrom { get; set; }
        public string EmailTo { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string CcAddress { get; set; }
        public string Attachment { get; set; }
        public int Status { get; set; }
        public DateTime MailCreateDate { get; set; }

        public string SMSBody { get; set; }

        public int MenuId { get; set; }
        public int RefId { get; set; }
    }
}
