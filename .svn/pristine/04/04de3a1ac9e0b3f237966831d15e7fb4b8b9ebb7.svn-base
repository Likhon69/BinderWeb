var UserDetailsManager = {
    AddUserDeatails: function () {
        debugger;
        if (UserDetailsHelper.ValidateUser()) {
            var objUsers = UserDetailsHelper.CreateUserObj();
            var objUsersInfo = objUsers;
            var jsonParam = objUsersInfo;
            var serviceUrl = coreApi + "/Users/SaveUser";
            AjaxManager.Post(serviceUrl, jsonParam, function (response) {
                if (response == "Success") {
                    Message.Success("Save Successfully");


                } else {
                    Message.Warning(response);
                }
            }, function (error) {

            });
        }
    }
};

var UserDetailsHelper = {
    DealerTypeNameCombo: function () {

        var objUnit = AjaxManager.GetDataSource(binderApi + "/Dealer/GetDealers");
        $("#cmbDealer").kendoComboBox({
            placeholder: "Select Dealer Name",
            dataTextField: "DealerName",
            dataValueField: "DealerId",
            dataSource: objUnit,
            filter: "contains",
            suggest: true,
            change: function () {
                var val = this.value();
                //UnitNameCombo(val);
            }
        });

    },

    CreateUserObj: function () {
        debugger;
        var objUser = new Object();
        objUser.UserId = $("#hdnUserId").val();
        //objUser.CompanyId = $("#cmbCompanyNameDetails").val();
        objUser.LoginId = $("#txtLoginId").val();
        objUser.UserName = $("#txtUserName").val();
        //objUser.EmailAddress = $("#txtEmail").val();
        objUser.EmployeeId = $("#cmbDealer").val();
        objUser.Password = $("#txtNewPassword").val();
        //objUser.IMEI = $("#txtIMEI").val();
        var delaerCmb = $("#cmbDealer").data("kendoComboBox");
        objUser.EmployeeId = delaerCmb == null || delaerCmb.value() == '' ? 0 : delaerCmb.value();

        //objUser.DefaultDashboard = $("#ddlDefaultDashboard").data('kendoDropDownList').value();
        if ($("#chkIsActive").is(':checked') == true) {
            objUser.IsActive = true;
        }
        else {
            objUser.IsActive = false;
        }

        objUser.GroupMemberList = groupPermisionArray;
        return objUser;
    },
    clearUserInfoForm: function () {

        debugger;
        $("#hdnUserId").val("0");
        /* $("#cmbCompanyName").val("");
         userInfoHelper.populateCompany();*/
        $("#txtLoginId").val("");
        $("#txtNewPassword").val("");
        $("#txtConfirmPassword").val("");
        $("#txtUserName").val("");
        //$("#txtEmail").val("");
        $("#cmbDealer").data("kendoComboBox").value("");
        /*  $("#txtIMEI").val('');*/

        /*  var branch = $("#cmbBranchDetails").data("kendoComboBox");
          branch.destroy();
  
          empressCommonHelper.GenerateBranchCombo(CurrentUser.CompanyId, "cmbBranchDetails");
  
  
          var department = $("#cmbDepartmentNameDetails").data("kendoComboBox");
          department.destroy();
          userInfoHelper.GetDepartmentByCompanyId(CurrentUser.CompanyId);*/

        /*  var combobox = $("#cmbDealer").data("kendoComboBox");
          combobox.destroy();*/
        /* userInfoHelper.GenerateEmployeeByCompanyId(CurrentUser.CompanyId, CurrentUser.BranchId, 0);*/

        $('.chkBox').attr('checked', false);

        $("#divUserInfo > form").kendoValidator();
        $("#divUserInfo").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");

        $("#ddlDefaultDashboard").val(1);

    },
    ValidateUser: function () {
        var data = [];
        debugger;
        var validator = $("#divUserInfo").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            /*   var companyId = $("#cmbCompanyNameDetails").val();
               var comboboxforCompany = $("#cmbCompanyNameDetails").data("kendoComboBox");
               var companyName = comboboxforCompany.text();
               if (companyId == companyName) {
                   status.text("Oops! Company Name is invalid.").addClass("invalid");
                   $("#cmbCompanyName").val("");
                   userInfoHelper.GenerateMotherCompanyCombo();
                   return false;
               }*/

            var userId = $("#hdnUserId").val();
            //if (userId == "0") {
            if ($("#txtNewPassword").val() == "") {
                Message.Warning("Oops! Please Insert Password.");
                $("#txtNewPassword").val("");
                return false;
            }
            if ($("#txtConfirmPassword").val() == "") {
                Message.Warning("Oops! Please Insert Confirm Password.");
                $("#txtConfirmPassword").val("");
                return false;
            }
            if ($("#txtNewPassword").val() != $("#txtConfirmPassword").val()) {
                Message.Warning("Oops! Password and Confirm password not match.");
                $("#txtNewPassword").val("");
                $("#txtConfirmPassword").val("");
                return false;
            }
            //}

            var employeeId = $("#cmbDealer").val();
            var comboboxfoDealer = $("#cmbDealer").data("kendoComboBox");
            /*  var dealerName = comboboxfoDealer.text();
              if (employeeId == dealerName) {
                  status.text("Oops! Dealer Name is invalid.").addClass("invalid");
                  $("#cmbDealer").val("");
                  //userInfoHelper.GetEmployeeByCompanyId(companyId);
                  return false;
              }*/

            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
    createTab: function () {
        $("#tabstrip").kendoTabStrip({});
    },
    populateUserInformationDetails: function (objUser) {

        $("#hdnUserId").val(objUser.UserId);
        $("#txtLoginId").val(objUser.LoginId);
        $("#txtUserName").val(objUser.UserName);
        $("#txtNewPassword").val('');
        $("#txtConfirmPassword").val('');


        /*   $("#txtDealerCode").val(objDealers.DealerCode);
   
           $("#FileAttachment").val(objDealers.Agrementfile);*/

        $("#cmbDealer").data("kendoComboBox").value(objUser.EmployeeId);
        //$("#lnkAttachment").attr("href", objDealers.Agrementfile);
        if (objUser.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }


        UserDetailsHelper.DealerTypeNameCombo(objUser.CompanyId, objUser.BranchId, objUser.DepartmentId);
    }
}