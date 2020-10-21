﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class EmailContent
    {
        public int EmailContentId { get; set; }
        public string EmailSubject { get; set; }
        public string EmailTitle { get; set; }
        public string EmailAttachment { get; set; }
        public string EmailBody { get; set; }
        public string ImagesPath { get; set; }
        public int? EmailContentStatus { get; set; }
        public int? EmailTitleId { get; set; }
        public int? EmailNotificationId { get; set; }
        public string Smsbody { get; set; }
        public string ParamDefination { get; set; }
        public string NotifcationBody { get; set; }
        public bool? IsSentSms { get; set; }
        public bool? IsSentNotification { get; set; }
        public bool? IsSentEmail { get; set; }
    }
}
