/// <reference path="UserSummary.js" />
/// <reference path="UserDetails.js" />
/// <reference path="UserInfo.js" />
/// <reference path="UserUpload.js" />


$(document).ready(function () {


    UserDetailsHelper.DealerTypeNameCombo();
    UserDetailsHelper.clearUserInfoForm();
    $("#btnSave").click(function () {

        UserDetailsManager.AddUserDeatails();
       // userSummaryHelper.clickEventForResetPassword();
    });
    $("#btnClearAll").click(function () {

        UserDetailsHelper.clearUserInfoForm();
        // userSummaryHelper.clickEventForResetPassword();
    });
    UserDetailsHelper.createTab();
    groupMembershipHelper.GetGroupByCompanyId(0);
    //userSummaryHelper.clickEventForResetPassword();
   // userSummaryHelper.clickEventForEditUser();
 // userInfoHelper.initiateConveyanceReport();

   /* $("#cmbDepartmentNameDetails").change(function () {
        userInfoHelper.changeDepartmentName();
    });*/
   // userInfoHelper.populateCompany();
    userSummaryHelper.GenerateUserSummaryGrid(0);
/*
    userDetailsHelper.createTab();
    //userSummaryHelper.clickEventForResetPassword();
    userSummaryHelper.clickEventForEditUser();
  //  userSummaryHelper.GenerateMotherCompanyCombo();
   // userInfoHelper.GenerateMotherCompanyCombo();
  //  userSummaryHelper.CompanyIndexChangeEvent();
    // userInfoHelper.GetEmployeeByCompanyId(0);
    userUploadManager.userUpload();*/

    //$("#cmbCompanyNameDetails").change(function() {
    //    userInfoHelper.changeCompanyName();
    //});
    //$("#cmbCompanyNameDetails").focus();*/
});

var userSettingsManager = {};

var userSettingsHelper = {};

