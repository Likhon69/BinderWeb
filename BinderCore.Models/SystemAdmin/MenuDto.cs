using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.Models.SystemAdmin
{
    public class MenuDto
    {
        public int MenuId { get; set; }
        public int ModuleId { get; set; }
        public string MenuName { get; set; }
        public string MenuPath { get; set; }
        public int ParentMenu { get; set; }
        public int TotalCount { get; set; }
        public string ModuleName { get; set; }
        public int ToDo { get; set; }
        public int SortOrder { get; set; }
        public string ParentMenuName { get; set; }
    }
}
