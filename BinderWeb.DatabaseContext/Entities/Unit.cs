﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class Unit
    {
        public int UnitId { get; set; }
        public string UnitName { get; set; }
        public bool? IsActive { get; set; }
    }
}
