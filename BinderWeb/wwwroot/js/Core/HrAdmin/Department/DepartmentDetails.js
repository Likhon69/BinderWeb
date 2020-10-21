
var departmentDetailsManager = {
    
    SaveDepartmentInformation: function () {
        
        if (departmentDetailsHelper.ValidateDepartmentInfoForm()) {

            var objDepartment = departmentDetailsHelper.CreateDepartmentObject();

            var objDepartmentInfo = JSON.stringify(objDepartment).replace(/&/g, "^");
            var jsonParam = 'strobjDepartment=' + objDepartmentInfo;
            var serviceUrl = "../Department/SaveDepartment/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);

        }
        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Department Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            departmentDetailsHelper.clearDepartmentForm();
                            $("#gridDepartment").data("kendoGrid").dataSource.read();
                            $("#divgridDepartmentSolution").data("kendoGrid").dataSource.read();
                        }
                    }]);
            }
            else if (jsonData == "Department Already Exist") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Department Already Exist For this Company.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Failed', jsonData,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
        }
    }
    
};

var departmentDetailsHelper = {
    
    clearDepartmentForm: function () {
        $("#btnSaveDeprtment").text("Save");
        $("#hdnDepartmentId").val("0");
        $("#txtDepartmentCode").val("");
        $("#txtDepartmentName").val("");
        $('#chkIsActiveDepartment').attr('checked', false);
        $("#departmentDetailsDiv > form").kendoValidator();
        $("#departmentDetailsDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");

    },
    CreateDepartmentObject: function () {
        var objDepartment = new Object();
        objDepartment.DepartmentId = $("#hdnDepartmentId").val();
        objDepartment.DepartmentCode = $("#txtDepartmentCode").val();
        objDepartment.DepartmentName = $("#txtDepartmentName").val();
        objDepartment.IsActive = $("#chkIsActiveDepartment").is(':checked') == true ? 1 : 0;
        return objDepartment;
    },
    
    ValidateDepartmentInfoForm: function () {
        var data = [];

        var validator = $("#departmentDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
    
    populateDepartmentDetails: function (objDepartment) {
        if (objDepartment != null) {
            departmentDetailsHelper.clearDepartmentForm();
            $("#btnSaveDeprtment").text("Update");
            $("#hdnDepartmentId").val(objDepartment.DepartmentId);
            $("#txtDepartmentCode").val(objDepartment.DepartmentCode);
            $("#txtDepartmentName").val(objDepartment.DepartmentName);
            if (objDepartment.IsActive == 1) {
                $("#chkIsActiveDepartment").prop('checked', 'checked');
            } else {
                $("#chkIsActiveDepartment").removeProp('checked', 'checked');
            }
        }

    }
};

