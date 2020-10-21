﻿using BinderCore.Models.SystemAdmin;
using BinderCore.Services.Base;
using BinderUtility;
using BinderWeb.DatabaseContext.Entities;
using BinderWeb.Models.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace BinderCore.Services.SystemAdmin.Contracts
{
    public interface IUsersService : ICoreBaseServices
    {
        string SaveUser(UsersDto users);

        UsersDto GetUserById(int userId);

        GridEntity<UsersDto> GetUserSummary( GridOptions options);

        List<GroupMember> GetGroupMemberByUserId(int userId);

        string ResetPassword(int companyId, int userId);

        Users GetUserByLoginId(string loginId);

        //IQueryable<PasswordHistory> GetPasswordHistory(int userId, int oldPassUseRestriction);

        // string UpdateUser(Users users, PasswordHistory passHistory);

        Users GetUserByEmailAddress(string emailaddress);

        Users GetUserByEmployeeId(int hrRecordId);

        Users GetUserDetailsByEmployeeId(string employeeId);

        string UpdateTheme(Users user);


        //string ChangePassword(string password, Users objUser, SystemSettings objSystemSettings);
        string SaveUserIdToTempTbl(string importFilePath, int userId);
        //GridEntity<UserIdChange> GetUserIdUpdateData(GridOptions options);
        string SaveDataToMainTable();

        void UpdateUserStatus(int userId);

        string UpdateUser(Users users);

        Users GetUserByLoginIdForForgetPass(string loginId);
        Users GetUserByLoginIdWithPassword(string loginId, string encrpPass);
        string UpdateUserWithPassword(Users users);

        //string PasswordResetWithOTP(ForgetPasswsord model);
        AuthorizeUser Authenticate(string username, string password);

        
      

        string SaveUserOTP(string loginId);

        string ChangePassword(ChangePaswordModel model);
        List<Groups> GetGroups();
        Users GetUser(string loginId, string password);
    }
}
