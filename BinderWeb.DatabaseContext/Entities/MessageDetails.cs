﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class MessageDetails
    {
        public int MessageDetailsId { get; set; }
        public int HrRecordId { get; set; }
        public string EmailAddress { get; set; }
        public int MessageId { get; set; }
        public int DestinationType { get; set; }
        public bool? IsRead { get; set; }
        public DateTime? ReadTime { get; set; }

        public virtual Message Message { get; set; }
    }
}
