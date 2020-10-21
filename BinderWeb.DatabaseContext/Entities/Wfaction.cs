﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class Wfaction
    {
        public int WfactionId { get; set; }
        public int WfstateId { get; set; }
        public string ActionName { get; set; }
        public int NextStateId { get; set; }
        public int? EmailAlert { get; set; }
        public int? SmsAlert { get; set; }
    }
}
