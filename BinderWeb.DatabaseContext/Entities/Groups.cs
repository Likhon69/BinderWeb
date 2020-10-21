using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class Groups
    {
        public Groups()
        {
            GroupPermission = new HashSet<GroupPermission>();
        }

        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public int? IsDefault { get; set; }

        public virtual ICollection<GroupPermission> GroupPermission { get; set; }
    }
}
