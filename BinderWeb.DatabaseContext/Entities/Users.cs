﻿using System;
using System.Collections.Generic;

namespace BinderWeb.DatabaseContext.Entities
{
    public partial class Users
    {
        public int UserId { get; set; }
        public int? CompanyId { get; set; }
        public string LoginId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdateDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public int? FailedLoginNo { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsExpired { get; set; }
        public string Theme { get; set; }
        public int? AccessParentCompany { get; set; }
        public int? DefaultDashboard { get; set; }
        public bool? IsFirstLoginEnable { get; set; }
        public string EmailAddress { get; set; }
    }
}