﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class AppUser
    {
        public int AppUserId { get; set; }
        public int? DealerId { get; set; }
        public int? UserId { get; set; }
    }
}