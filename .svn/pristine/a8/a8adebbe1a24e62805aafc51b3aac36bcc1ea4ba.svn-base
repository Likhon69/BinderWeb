
var gbRSMRegionManagerArray = [];

var RSMRegionDetailsManager = {

    GetAllActiveEmployee: function () {
        var objEmp = "";
        var jsonParam = "";
        var serviceUrl = "../RSMRegion/GetAllActiveEmployee/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objEmp = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objEmp;
    },

    GetAllActveManagerByRsmRegionId: function (rsmRegionId) {
        var objrsmEmpManager = "";
        var jsonParam = "rsmRegionId=" + rsmRegionId;
        var serviceUrl = "../RSMRegion/GetAllActveEmployeeByRsmRegionId/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objrsmEmpManager = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objrsmEmpManager;
    },

    SaveRSMRegion: function () {

        var validator = $("#divRSMRegionDetailsInfo").kendoValidator().data("kendoValidator"),
            status = $("status");

        if (validator.validate()) {
            var objRsmRegion = RSMRegionDetailsHepler.CreateRSMRegion();
            var objRsmRegionInfo = JSON.stringify(objRsmRegion);

            var jsonParam = 'objRsmRegionInfo:' + objRsmRegionInfo;
            var serviceUrl = "../RSMRegion/SaveRsmRegion";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'RSM  Region Information Saved/Updated Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#gridRSMRegionSummary").data("kendoGrid").dataSource.read();
                            FieldForceRsmMappingInfoHelper.populateRSMRegionCombo();
                            RSMRegionDetailsHepler.clearRSMRegion();
                        }
                    }
                ]);
            }
            else if (jsonData == "Exist") {
                AjaxManager.MsgBox('warning', 'center', 'warning', 'RSM Region Code already exist',
             [
                 {
                     addClass: 'btn btn-primary',
                     text: 'ok',
                     onClick: function ($noty) {
                         $noty.close();
                     }
                 }
             ]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
            [
                {
                    addClass: 'btn btn-primary',
                    text: 'ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }
            ]);
        }
    },

    SearchEmployeeForRSMManager: function (employeeId) {

        var param = "employeeId=" + employeeId;
        var serviceUrl = "../Employee/GetEmploymentByEmployeeId";
        AjaxManager.GetJsonResult(serviceUrl, param, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData != null) {
                $("#spnRSMManager").html(jsonData.EmployeeName + ", " + jsonData.DesignationName + ", " + jsonData.DepartmentName);
                $("#hdnRSMManagerHrRecordId").val(jsonData.HrRecordId);
            }
            else {
                AjaxManager.MsgBox('warning', 'center', 'Error', "Employee ID not exist",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        $("#txtHrManagement").val("");
                        $("#spnRSMManager").html("");
                        $("#hdnRSMManagerHrRecordId").val("0");
                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },
    
    SearchEmployeeForSalaesManager: function (employeeId) {

        var param = "employeeId=" + employeeId;
        var serviceUrl = "../Employee/GetEmploymentByEmployeeId";
        AjaxManager.GetJsonResult(serviceUrl, param, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            if (jsonData != null) {
                $("#spnSalesManager").html(jsonData.EmployeeName + ", " + jsonData.DesignationName + ", " + jsonData.DepartmentName);
                $("#hdnSalesManagerHrRecordId").val(jsonData.HrRecordId);
            }
            else {
                AjaxManager.MsgBox('warning', 'center', 'Error', "Employee ID not exist",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        $("#txtSalesManager").val("");
                        $("#spnSalesManager").html("");
                        $("#hdnSalesManagerHrRecordId").val("0");
                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },
};

var RSMRegionDetailsHepler = {

    InitRSMRegionDetails: function () {
        RSMRegionDetailsHepler.PopulateRSMMultiSelect();

        $("#txtRSMRegionManager").keypress(function (e) {
            var key = e.which;
            if (key == 13) // the enter key code
            {
                var empId = $("#txtRSMRegionManager").val();
                RSMRegionDetailsManager.SearchEmployeeForRSMManager(empId.trim());
            }
        });
        $("#btnSearchRsmManager").click(function () {
            var empId = $("#txtRSMRegionManager").val();
            RSMRegionDetailsManager.SearchEmployeeForRSMManager(empId.trim());
        });

        $("#txtSalesManager").keypress(function (e) {
            var key = e.which;
            if (key == 13) // the enter key code
            {
                var empId = $("#txtSalesManager").val();
                RSMRegionDetailsManager.SearchEmployeeForSalaesManager(empId.trim());
            }
        });
        $("#btnSearchSalesManager").click(function () {
            var empId = $("#txtSalesManager").val();
            RSMRegionDetailsManager.SearchEmployeeForSalaesManager(empId.trim());
        });
    },

    CreateRSMRegion: function () {

        var obj = new Object();
        obj.RSMRegionId = $("#hdnRSMRegionId").val();
        obj.RSMRegionCode = $("#txtRSMRegionCode").val();
        obj.RSMRegionName = $("#txtRSMRegionName").val();
        obj.RSMManagerHrRecordId = $("#hdnRSMManagerHrRecordId").val();
        obj.SalaesManagerHrRecordId = $("#hdnSalesManagerHrRecordId").val();
        obj.RSMManagerArray = $("#msRSMRegionManager").data("kendoMultiSelect").value();
        obj.IsActive = $("#chkRSMRegionIsActive").is(':checked') == true ? 1 : 0;

        return obj;
    },
    populateRSMRegion: function (obj) {
        if (obj != null) {
            $("#hdnRSMRegionId").val(obj.RSMRegionId);
            $("#hdnRSMManagerHrRecordId").val(obj.RSMManagerHrRecordId);
            $("#hdnSalesManagerHrRecordId").val(obj.SalaesManagerHrRecordId);
            $("#txtRSMRegionCode").val(obj.RSMRegionCode);
            $("#txtRSMRegionName").val(obj.RSMRegionName);
            
            $("#txtRSMRegionManager").val(obj.RSMRegionManagerEmpId);
            $("#spnRSMManager").html(obj.RSMRegionManager);
            
            $("#txtSalesManager").val(obj.SalesManagerEmpId);
            $("#spnSalesManager").html(obj.SalesManagerName);
            
            if (obj.IsActive == 1) {
                $("#chkRSMRegionIsActive").prop('checked', 'checked');
            } else {
                $("#chkRSMRegionIsActive").removeProp('checked', 'checked');
            }
        }
    },

    clearRSMRegion: function () {
        $("#hdnRSMRegionId").val("0");
        $("#hdnRSMManagerHrRecordId").val("0");
        $("#hdnSalesManagerHrRecordId").val("0");
        $("#txtRSMRegionCode").val("");
        $("#txtRSMRegionName").val("");
        $("#txtRSMRegionManager").val("");
        $("#spnRSMManager").html("");
        
        $("#txtSalesManager").val("");
        $("#spnSalesManager").html("");
        $("#msRSMRegionManager").data("kendoMultiSelect").value("");

        $("#chkRSMRegionIsActive").removeAttr("checked", false);

        $("#divRSMRegionDetailsInfo > form").kendoValidator();
        $("#divRSMRegionDetailsInfo").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    },

    PopulateRSMRegionManager: function (rsmRegionId) {

        var rsmManagerList = RSMRegionDetailsManager.GetAllActveManagerByRsmRegionId(rsmRegionId);

        if (rsmManagerList.length > 0) {
            RSMRegionDetailsHepler.PopulateRSMManagerArray(rsmManagerList);
        }else
        {
            $("#msRSMRegionManager").data("kendoMultiSelect").value("");
        }
    },

    PopulateRSMManagerArray: function (rsmManagerList) {

        gbRSMRegionManagerArray = [];
        for (var i = 0; i < rsmManagerList.length; i++) {
            gbRSMRegionManagerArray.push(rsmManagerList[i].HRRecordId, rsmManagerList[i].FullName);
        }
        if (rsmManagerList.length > 0) {
            $("#msRSMRegionManager").data("kendoMultiSelect").value(gbRSMRegionManagerArray);
        }
    },

    PopulateRSMMultiSelect: function () {
        var obj = new Object();
        obj = RSMRegionDetailsManager.GetAllActiveEmployee();

        $("#msRSMRegionManager").kendoMultiSelect({
            placeholder: "Select RSM Manager...",
            dataTextField: "FullName",
            dataValueField: "HRRecordId",
            autoBind: false,
            dataSource: obj,
            
        });
    },

    ShowRsmRegionDetails: function() {
        $("#divRsmRegionDetails").show();
        $("#divRsmRegionSummary").hide();
        RSMRegionDetailsHepler.clearRSMRegion();
    },

    EditShowRsmRegionDetails: function() {
        $("#divRsmRegionDetails").show();
        $("#divRsmRegionSummary").hide();
    },
    HideRsmRegionDetails: function () {
        $("#divRsmRegionDetails").hide();
        $("#divRsmRegionSummary").show();
        RSMRegionDetailsHepler.clearRSMRegion();
    },

};

