﻿/*var userInfoManager = {

    GetEmployeeType: function () {
        var objEmployeeType = "";
        var jsonParam = "";

        var serviceUrl = coreApi + "/Users/GetDealer";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objEmployeeType = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objEmployeeType;
    }

};

var userInfoHelper = {
    //ashraf
    initiateConveyanceReport: function () {
        //userInfoHelper.populateCompany();

        //userInfoHelper.GenerateEmployeeTypeCombo();
        userInfoHelper.EmployeeTypeCombo();
        //userInfoHelper.GenerateDashboardDropdown();

    },

*//*
    populateCompany: function () {
        var objCompany = new Object();
        objCompany = userInfoManager.GetMotherCompany();
        $("#cmbCompanyNameDetails").kendoComboBox({
            placeholder: "All",
            dataTextField: "CompanyName",
            dataValueField: "CompanyId",
            dataSource: objCompany
        });

        if (CurrentUser.CompanyId != null) {
            var companyData = $("#cmbCompanyNameDetails").data("kendoComboBox");
            companyData.value(CurrentUser.CompanyId);
            userInfoHelper.changeCompanyName();
        }
    },
    GenerateBranchCombo: function (companyId) {
        var objBranch = new Object();

        objBranch = userInfoManager.GenerateBranchCombo(companyId);

        $("#cmbBranchDetails").kendoComboBox({
            placeholder: "All",
            dataTextField: "BranchName",
            dataValueField: "BranchId",
            dataSource: objBranch
        });

    },

    GetDepartmentByCompanyId: function (companyId) {
        var objDepartment = new Object();

        objDepartment = userInfoManager.GetDepartmentByCompanyId(companyId);

        $("#cmbDepartmentNameDetails").kendoComboBox({
            placeholder: "All",
            dataTextField: "DepartmentName",
            dataValueField: "DepartmentId",
            dataSource: objDepartment
        });
    },

    GenerateEmployeeByCompanyId: function (companyId, branchId, departmentId) {
        var objEmp = new Object();
        if (branchId == 0) {
            objEmp = null;
        }
        else {
            objEmp = userInfoManager.GetEmployeeByCompanyIdAndBranchIdAndDepartmentId(companyId, branchId, departmentId);
        }
        $("#cmbEmployee").kendoComboBox({
            placeholder: "All",
            dataTextField: "FullName",
            dataValueField: "HRRecordId",
            dataSource: objEmp
        });
    },

    EmployeeTypeCombo: function () {
        var objEmployeeType = new Object();
        objEmployeeType = userInfoManager.GetEmployeeType();
        $("#cmbEmployeeType").kendoComboBox({
            placeholder: "All",
            dataTextField: "EmployeeTypeName",
            dataValueField: "EmployeeType",
            dataSource: objEmployeeType
        });

        //if (CurrentUser.CompanyId != null) {
        //    var companyData = $("#cmbEmployeeType").data("kendoComboBox");
        //    companyData.value(CurrentUser.CompanyId);
        //    userInfoHelper.changeEmployeeType();
        //}
    },*/
/*
    changeCompanyName: function () {

        var comboboxbranch = $("#cmbBranchDetails").data("kendoComboBox");
        var comboboxDep = $("#cmbDepartmentNameDetails").data("kendoComboBox");
        var comboboxEmp = $("#cmbEmployee").data("kendoComboBox");


        var companyData = $("#cmbCompanyNameDetails").data("kendoComboBox");
        var companyId = companyData.value();
        var companyName = companyData.text();
        if (companyId == companyName) {
            companyData.value('');
            comboboxbranch.value('');
            comboboxbranch.destroy();

            comboboxDep.value('');
            comboboxDep.destroy();
            comboboxEmp.value('');
            comboboxEmp.destroy();

            userInfoHelper.GenerateBranchCombo(0);
            userInfoHelper.GetDepartmentByCompanyId(0);
            userInfoHelper.GenerateDesignationCombo(0);
            userInfoHelper.GenerateEmployeeByCompanyId(0, 0, 0);

            return false;
        }
        if (comboboxbranch != undefined) {
            comboboxbranch.value('');
            comboboxbranch.destroy();
        }
        if (comboboxDep != undefined) {
            comboboxDep.value('');
            comboboxDep.destroy();
        }

        if (comboboxEmp != undefined) {
            comboboxEmp.value('');
            comboboxEmp.destroy();
        }


        userInfoHelper.GenerateBranchCombo(companyId);
        userInfoHelper.GetDepartmentByCompanyId(companyId);
        userInfoHelper.GenerateEmployeeByCompanyId(companyId, 0, 0);
        groupMembershipHelper.GetGroupByCompanyId(companyId);

    },*/

   /* changeBranchName: function () {

        var comboboxbranch = $("#cmbBranchDetails").data("kendoComboBox");
        var comboboxDep = $("#cmbDepartmentNameDetails").data("kendoComboBox");
        var comboboxEmp = $("#cmbEmployee").data("kendoComboBox");


        var companyData = $("#cmbCompanyNameDetails").data("kendoComboBox");
        var companyId = companyData.value();
        var companyName = companyData.text();

        var branchId = comboboxbranch.value();
        var branchName = comboboxbranch.text();
        if (branchId == branchName) {
            comboboxbranch.value('');
            if (comboboxDep != undefined) {
                comboboxDep.value('');
                comboboxDep.destroy();
            }

            if (comboboxEmp != undefined) {
                comboboxEmp.value('');
                comboboxEmp.destroy();
            }

            userInfoHelper.GetDepartmentByCompanyId(companyId);
            userInfoHelper.GenerateEmployeeByCompanyId(companyId, 0, 0);
            return false;
        }

        if (comboboxDep != undefined) {
            comboboxDep.value('');
            comboboxDep.destroy();
        }

        if (comboboxEmp != undefined) {
            comboboxEmp.value('');
            comboboxEmp.destroy();
        }

        userInfoHelper.GetDepartmentByCompanyId(companyId);
        userInfoHelper.GenerateEmployeeByCompanyId(companyId, branchId, 0);



    },
*/
  /*  changeDepartmentName: function () {

        var companyData = $("#cmbCompanyNameDetails").data("kendoComboBox");
        var companyId = companyData.value();
        var companyName = companyData.text();

        var comboboxbranch = $("#cmbBranchDetails").data("kendoComboBox");
        var branchId = comboboxbranch.value();
        var branchName = comboboxbranch.text();

        var comboboxDep = $("#cmbDepartmentNameDetails").data("kendoComboBox");
        var departmentId = comboboxDep.value();
        var departmentName = comboboxDep.text();

        var comboboxEmp = $("#cmbEmployee").data("kendoComboBox");

        //if (departmentId == departmentName) {
        //    if (comboboxEmp != undefined) {
        //        comboboxEmp.value('');
        //        comboboxEmp.destroy();
        //    }


        //    userInfoHelper.GenerateEmployeeByCompanyId(companyId, branchId, 0);
        //    return false;
        //}



        if (departmentId == "") {

            departmentId = 0;
        } else {
            if (comboboxEmp != undefined) {
                comboboxEmp.value('');
                comboboxEmp.destroy();
            }
        }
        userInfoHelper.GenerateEmployeeByCompanyId(companyId, branchId, departmentId);



    },*//*

    EmployeeTypeCombo: function () {
        var objEmployeeType = new Object();
        objEmployeeType = userInfoManager.GetEmployeeType();
        $("#cmbDealer").kendoComboBox({
            placeholder: "All",
            dataTextField: "DealerName",
            dataValueField: "DealerId",
            dataSource: objEmployeeType
        });

  *//*  clearUserInfoForm: function () {
        $("#btnSave").text("Save");

        $("#hdnUserId").val("0");
       *//* $("#cmbCompanyName").val("");
        userInfoHelper.populateCompany();*//*
        $("#txtLoginId").val("");
        $("#txtNewPassword").val("");
        $("#txtConfirmPassword").val("");
        $("#txtUserName").val("");
        //$("#txtEmail").val("");
        $("#cmbDealer").val("");
       *//*  $("#txtIMEI").val('');*/

      /*  var branch = $("#cmbBranchDetails").data("kendoComboBox");
        branch.destroy();

        empressCommonHelper.GenerateBranchCombo(CurrentUser.CompanyId, "cmbBranchDetails");


        var department = $("#cmbDepartmentNameDetails").data("kendoComboBox");
        department.destroy();
        userInfoHelper.GetDepartmentByCompanyId(CurrentUser.CompanyId);*//*

        var combobox = $("#cmbDealer").data("kendoComboBox");
        combobox.destroy();
       *//* userInfoHelper.GenerateEmployeeByCompanyId(CurrentUser.CompanyId, CurrentUser.BranchId, 0);*//*

        $('.chkBox').attr('checked', false);

        $("#divUserInfo > form").kendoValidator();
        $("#divUserInfo").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");

        $("#ddlDefaultDashboard").val(1);

    },*/

   /* ValidateUserInfoForm: function () {
        var data = [];

        var validator = $("#divUserInfo").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
         *//*   var companyId = $("#cmbCompanyNameDetails").val();
            var comboboxforCompany = $("#cmbCompanyNameDetails").data("kendoComboBox");
            var companyName = comboboxforCompany.text();
            if (companyId == companyName) {
                status.text("Oops! Company Name is invalid.").addClass("invalid");
                $("#cmbCompanyName").val("");
                userInfoHelper.GenerateMotherCompanyCombo();
                return false;
            }*//*

            var userId = $("#hdnUserId").val();
            if (userId == "0") {
                if ($("#txtNewPassword").val() == "") {
                    status.text("Oops! Please Insert Password.").addClass("invalid");
                    $("#txtNewPassword").val("");
                    return false;
                }
                if ($("#txtConfirmPassword").val() == "") {
                    status.text("Oops! Please Insert Confirm Password.").addClass("invalid");
                    $("#txtConfirmPassword").val("");
                    return false;
                }
                if ($("#txtNewPassword").val() != $("#txtConfirmPassword").val()) {
                    status.text("Oops! Password and Confirm password not match.").addClass("invalid");
                    $("#txtNewPassword").val("");
                    $("#txtConfirmPassword").val("");
                    return false;
                }
            }

            var employeeId = $("#cmbEmployee").val();
            var comboboxforEmployee = $("#cmbEmployee").data("kendoComboBox");
            var employeeName = comboboxforEmployee.text();
            if (employeeId == employeeName) {
                status.text("Oops! Employee Name is invalid.").addClass("invalid");
                $("#cmbEmployee").val("");
                userInfoHelper.GetEmployeeByCompanyId(companyId);
                return false;
            }

            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

    CreateUserInformationForSaveData: function () {
        var objUser = new Object();
        objUser.UserId = $("#hdnUserId").val();
        objUser.CompanyId = $("#cmbCompanyNameDetails").val();
        objUser.LoginId = $("#txtLoginId").val();
        objUser.UserName = $("#txtUserName").val();
        //objUser.EmailAddress = $("#txtEmail").val();
        objUser.EmployeeId = $("#cmbEmployee").val();
        objUser.Password = $("#txtNewPassword").val();
        objUser.IMEI = $("#txtIMEI").val();
        
        objUser.Employee_Id=  $("#cmbEmployee").data("kendoComboBox").dataItem().EmployeeId;
        
        objUser.DefaultDashboard = $("#ddlDefaultDashboard").data('kendoDropDownList').value();
        if ($("#chkIsActive").is(':checked') == true) {
            objUser.IsActive = true;
        }
        else {
            objUser.IsActive = false;
        }

        if ($("#chkAccessAllSbu").is(':checked') == true) {
            objUser.AccessParentCompany = 1;
        }
        else {
            objUser.AccessParentCompany = 0;
        }
        return objUser;
    },*//*

    populateUserInformationDetails: function (objUser) {

        userInfoHelper.clearUserInfoForm();
        $("#btnSave").text("Update");

        $("#hdnUserId").val(objUser.UserId);

        var company = $("#cmbCompanyNameDetails").data("kendoComboBox");
        company.value(objUser.CompanyId);

        var branch = $("#cmbBranchDetails").data("kendoComboBox");
        branch.destroy();

        empressCommonHelper.GenerateBranchCombo(objUser.CompanyId, "cmbBranchDetails");
        branch = $("#cmbBranchDetails").data("kendoComboBox");
        branch.value(objUser.BranchId);

        var department = $("#cmbDepartmentNameDetails").data("kendoComboBox");
        department.destroy();

        userInfoHelper.GetDepartmentByCompanyId(objUser.CompanyId);



        department = $("#cmbDepartmentNameDetails").data("kendoComboBox");
        department.value(objUser.DepartmentId);

        if (objUser.DepartmentId == 0) {
            department.value('');

        }

        var combobox = $("#cmbEmployee").data("kendoComboBox");
        combobox.destroy();
        userInfoHelper.GenerateEmployeeByCompanyId(objUser.CompanyId, objUser.BranchId, objUser.DepartmentId);

        combobox = $("#cmbEmployee").data("kendoComboBox");
        combobox.value(objUser.EmployeeId);

        $("#txtLoginId").val(objUser.LoginId);
        $("#txtUserName").val(objUser.UserName);
        $("#txtIMEI").val(objUser.IMEI);
        //$("#txtEmail").val(objUser.EmailAddress);
        //$("#txtNewPassword").val(objUser.Password);
        //$("#txtConfirmPassword").val(objUser.Password);
        if (objUser.AccessParentCompany == 1) {
            $('#chkAccessAllSbu').attr('checked', true);
        } else {
            $('#chkAccessAllSbu').attr('checked', false);
        }

        $('#chkIsActive').attr('checked', objUser.IsActive);
        //$("#ddlDefaultDashboard").data('kendoDropDownList').value(objUser.DefaultDashboard);
        //var employee = $("#cmbEmployee").data("kendoComboBox");
        //employee.value(objUser.EmployeeId);

        groupMembershipHelper.GetGroupByCompanyId(0);
    },

    GenerateDashboardDropdown: function (companyId) {
        

        $("#ddlDefaultDashboard").kendoDropDownList({
            //placeholder: "All",
            dataTextField: "text",
            dataValueField: "id",
            dataSource: [
                {
                    id: 1,
                    text: "Empress Home"
                },
                {
                    id: 2,
                    text: "Common Dashboard"
                },
                {
                    id: 3,
                    text: "HR Dashboard"
                }
            ]
        });

    },



};*/