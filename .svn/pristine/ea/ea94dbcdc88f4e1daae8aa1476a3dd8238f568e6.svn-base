var BranchManagerSettingsManager = {
    SaveBranchManagerInfo: function () {
        //debugger;
        if (BranchManagerSettingsHelper.ValidateBranchManagerInfoForm()) {
            var obj = BranchManagerSettingsHelper.CreateBranchManagerInfoObject();
            var objBranchManager = JSON.stringify(obj);
            var jsonParam = 'objBranchManager:' + objBranchManager;
            var url = "../BranchManagerSetting/SaveBranchManagerInfo/";
            AjaxManager.SendJson2(url, jsonParam, onSuccess, onFailed);
        }


        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', ' Saved Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#BranchManagerSummaryDiv").data("kendoGrid").dataSource.read();
                            BranchManagerSettingsHelper.ClearBranchManagerInfoObject();
                        }
                    }
                ]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
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

var BranchManagerSettingsHelper = {
    DivisionNameCombo: function () {

        var objDivision = new Object;
        objDivision = AjaxManager.GetDataSource("../BranchManagerSetting/GetAllDivisionNameForCombo");
        $("#cmbDivisionName").kendoComboBox({
            placeholder: "Select Division Name",
            dataTextField: "ZoneName",
            dataValueField: "ZoneId",
            dataSource: objDivision,
            filter: "contains",
            suggest: true,
        });

    },

    RegionNameCombo: function () {

        var objRegion = new Object;
        objRegion = AjaxManager.GetDataSource("../BranchManagerSetting/GetAllRegionNameForCombo");
        $("#cmbRegionName").kendoComboBox({
            placeholder: "Select Region Name",
            dataTextField: "RegionName",
            dataValueField: "RegionId",
            dataSource: objRegion,
            filter: "contains",
            suggest: true,
        });

    },

    AreaNameCombo: function () {

        var objArea = new Object;
        objArea = AjaxManager.GetDataSource("../BranchManagerSetting/GetAllAreaNameForCombo");
        $("#cmbAreaName").kendoComboBox({
            placeholder: "Select Area Name",
            dataTextField: "AreaName",
            dataValueField: "AreaId",
            dataSource: objArea,
            filter: "contains",
            suggest: true,
        });

    },

    BranchNameCombo: function () {

        var objBranch = new Object;
        objBranch = AjaxManager.GetDataSource("../BranchManagerSetting/GetAllBranchNameForCombo");
        $("#cmbBranchName").kendoComboBox({
            placeholder: "Select Branch Name",
            dataTextField: "BranchName",
            dataValueField: "BranchId",
            dataSource: objBranch,
            filter: "contains",
            suggest: true,
        });

    },

    

    //
    CreateBranchManagerInfoObject: function () {
        
        var objBranchManager = new Object();
        objBranchManager.BranchManagerId = $("#hdnBranchManagerId").val();
        objBranchManager.HrRecordId = $("#hdnHrRecordId").val();
        objBranchManager.ZoneId = $("#cmbDivisionName").data("kendoComboBox").value();
        objBranchManager.RegionId = $("#cmbRegionName").data("kendoComboBox").value();
        objBranchManager.AreaId = $("#cmbAreaName").data("kendoComboBox").value();
        objBranchManager.BranchId = $("#cmbBranchName").data("kendoComboBox").value();
        objBranchManager.EmployeeId = $("#txtSearchByEmployeeId").val();
        objBranchManager.EmployeeName = $("#lblEmployeeName").val("");
        objBranchManager.IsManager = $("#chkIsManager").is(':checked') == true ? 1 : 0;
        objBranchManager.EffectiveDate = $("#txtEffectiveDate").data("kendoDatePicker").value();
        objBranchManager.EndDate = $("#txtEndDate").data("kendoDatePicker").value();
        objBranchManager.IsActive = $("#chkIsActive").is(':checked') == true ? 1 : 0;


        return objBranchManager;
    },

    ClearBranchManagerInfoObject: function () {

        $("#hdnBranchManagerId").val("0");
        $("#hdnHrRecordId").val("0");
        $("#cmbDivisionName").data("kendoComboBox").value("");
        $("#cmbRegionName").data("kendoComboBox").value("");
        $("#cmbAreaName").data("kendoComboBox").value("");
        $("#cmbBranchName").data("kendoComboBox").value("");
        $("#txtSearchByEmployeeId").val("");
        $("#lblEmployeeName").val("");
        $('#chkIsManager').attr('checked', false);
        $("#txtEffectiveDate").val("");
        $("#txtEndDate").val("");
        $('#chkIsActive').attr('checked', false);
    },

    populateBranchManagerInfo: function (objBranchManager) {
       
        BranchManagerSettingsHelper.ClearBranchManagerInfoObject();
        $("#hdnBranchManagerId").val(objBranchManager.BranchManagerId);
        $("#hdnHrRecordId").val(objBranchManager.HrRecordId);
        $("#cmbDivisionName").data("kendoComboBox").value(objBranchManager.ZoneId);
        $("#cmbRegionName").data("kendoComboBox").value(objBranchManager.RegionId);
        $("#cmbAreaName").data("kendoComboBox").value(objBranchManager.AreaId);
        $("#cmbBranchName").data("kendoComboBox").value(objBranchManager.BranchId);
        $("#txtSearchByEmployeeId").val(objBranchManager.EmployeeId);
        $("#lblEmployeeName").val(objBranchManager.EmployeeName);
        if (objBranchManager.IsManager == 1) {
            $("#chkIsManager").prop('checked', 'checked');
        } else {
            $("#chkIsManager").removeProp('checked', 'checked');
        }
        $("#txtEffectiveDate").data('kendoDatePicker').value(objBranchManager.EffectiveDate);
        $("#txtEndDate").data('kendoDatePicker').value(objBranchManager.EndDate);
        if (objBranchManager.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }  
        
    },

    ValidateBranchManagerInfoForm: function () {
        var data = [];

        var validator = $("#BranchManagerSettingDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },



    SearchEmployeeNameByEmployeeId: function () {
        //debugger;
        if (BranchManagerSettingsHelper.validateSearchItem("SearchBranchManagerDiv")) {
            var employeeid = $("#txtSearchByEmployeeId").val();
            var param = "EmployeeId=" + employeeid;
            var serviceUrl = "../BranchManagerSetting/GetEmployeeNameByEmployeeId";
            AjaxManager.GetJsonResult(serviceUrl, param, false, false, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {


            if (jsonData != null) {

                BranchManagerSettingsHelper.populateEmployeeName(jsonData);
            }
            else {
                AjaxManager.MsgBox('warning', 'center', 'Error', "No data found",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        //currentEmploymentHelper.clearCurrentEmploymentInformation();

                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

    },


    populateEmployeeName: function (obj) {
        $("#lblEmployeeName").val(obj.EmployeeName);
        $("#hdnHrRecordId").val(obj.HrRecordId);

    },


    validateSearchItem: function (divId) {

        var validator = $("#" + divId).kendoValidator().data("kendoValidator"),
           status = $(".status");

        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        }
        else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },
};