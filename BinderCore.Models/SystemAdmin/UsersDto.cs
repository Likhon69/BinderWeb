using BinderWeb.DatabaseContext.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.Models.SystemAdmin
{
    public class UsersDto
    {

        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public string LoginId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int EmployeeId { get; set; } //HrRecorId
        public string DealerName { get; set; }

        public string ProfilePicture { get; set; }
        public int Gender { get; set; }
        public string EmployeeName { get; set; }
        public String Employee_Id { get; set; } //EmployeeId in Employment
        public string ShortName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public DateTime LastLoginDate { get; set; }
        public int FailedLoginNo { get; set; }
        public bool IsActive { get; set; }
        public bool IsExpired { get; set; }
        public string IsFirstLogin { get; set; }
        public string CompanyName { get; set; }
        public string FullLogoPath { get; set; }
        public bool LogHourEnable { get; set; }
    
        public int AccessParentCompany { get; set; }
 

        public int ShiftId { get; set; }
        public int BranchId { get; set; }
        public int DepartmentId { get; set; }
        public string Theme { get; set; }

        public string AttendanceCardNo { get; set; }

       // public List<GroupMember> GroupMembers { get; set; }

        public int DefaultDashboard { get; set; }

        //new
        public string DepartmentName { get; set; }
        public string DESIGNATIONNAME { get; set; }
        public int StateId { get; set; }
        public string IMEI { get; set; }

        public string EmpId { get; set; }

        public bool IsFirstLoginEnable { get; set; }
        public string OfficialEmail { get; set; }
        public string OfficialContactNo { get; set; }
        public string MobileNo { get; set; }
        public List<GroupMember> GroupMemberList { get; set; }

        public string EmailAddress { get; set; }
    }
}
