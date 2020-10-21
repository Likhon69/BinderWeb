var DivisionManagerDetailsManager = {


    GetDivisionComboData: function () {
        var objDivision = "";
        var jsonParam = "";
        var serviceUrl = "../DivisionManagerSettings/GetDivisionComboData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objDivision = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objDivision;
    },

    GetEmployeeInfoByEmployeeId: function () {
        var employeeid = $("#txtEmployeeId").val();
        if (employeeid != "") {
            var objEmployee = empressCommonManager.SearchEmploymentInformationByEmployeeCode(employeeid);
            if (objEmployee != null) {
                $("#hdnHrrecordId").val(objEmployee.HrRecordId)
                $("#txtEmployeeName").val(objEmployee.EmployeeName)
            }
        } else {
            Message.Warning("Please Give an Employee ID");
        }

    },

    SaveDivisionMappingInfo: function () {
        var validator = $("#divDivisionDetailsInfo").kendoValidator().data("kendoValidator"),
           status = $(".status");

        if (validator.validate()) {
            var objDivisionDetails = DivisionManagerDetailsHelper.CreateDivisionManagerMappingDetails();

            var objMapInfo = JSON.stringify(objDivisionDetails).replace('&', '^');
            var jsonParam = "objMapInfo:" + objMapInfo;
            var serviceUrl = "../DivisionManagerSettings/SaveDivisionManagerMappingDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {

            if (jsonData === "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Division manager saved/updated successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                            $noty.close();
                            $("#gridDivisionManagerMap").data("kendoGrid").dataSource.read();
                            DivisionManagerDetailsHelper.clearDivisionMapDetails();
                        }
                    }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                        [{
                            addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'OK', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }

    },

};
var DivisionManagerDetailsHelper = {

    GenerateDivisionCombo: function () {
        var objDivisionCombo = new Object();
        objDivisionCombo = DivisionManagerDetailsManager.GetDivisionComboData();

        $("#cmbDivision").kendoComboBox({
            placeholder: "Select Division",
            dataTextField: "DivisionName",
            dataValueField: "DivisionId",
            dataSource: objDivisionCombo
        });
    },
    GenerateEfectiveDate: function () {
        $("#txtEffectiveDate").kendoDatePicker({
            depth: "year",
            format: "dd-MMM-yyyy",
        });
    },
    GenerateEndDate: function () {
        $("#txtEndDate").kendoDatePicker({
            depth: "year",
            format: "dd-MMM-yyyy",
        });
    },


    CreateDivisionManagerMappingDetails: function () {

    var obj = new Object();

    obj.DivisionManagerMapId = $("#hdnDivisionManagerMapId").val();
    obj.DivisionManagerId = $("#hdnHrrecordId").val();
    obj.DivisionId = $("#cmbDivision").data("kendoComboBox").value();
    obj.EffectiveDate = $("#txtEffectiveDate").data("kendoDatePicker").value();
    obj.EndDate = $("#txtEndDate").data("kendoDatePicker").value();
    obj.IsActive = $("#chkDivisionManagerIsActive").is(':checked') === true ? 1 : 0;

    return obj;
    },

    clearDivisionMapDetails: function () {
        $("#hdnDivisionManagerMapId").val('0');
        $("#hdnHrrecordId").val('0');
        $("#txtEmployeeId").val('');
        $("#txtEmployeeName").val('');
        $("#cmbDivision").data("kendoComboBox").value('');
        $("#txtEffectiveDate").data("kendoDatePicker").value('');
        $("#txtEndDate").data("kendoDatePicker").value('');
        $("#chkDivisionManagerIsActive").removeAttr("checked", false);
    },

    populateMappingDetails: function (selectedItem){
        $("#hdnDivisionManagerMapId").val(selectedItem.DivisionManagerMapId);
        $("#hdnHrrecordId").val(selectedItem.DivisionManagerId);
        $("#txtEmployeeId").val(selectedItem.EmployeeId);
        $("#txtEmployeeName").val(selectedItem.EmployeeName);
        $("#cmbDivision").data("kendoComboBox").value(selectedItem.DivisionId);
        $("#txtEffectiveDate").data("kendoDatePicker").value(selectedItem.EffectiveDate);
        $("#txtEndDate").data("kendoDatePicker").value(selectedItem.EndDate);
        if (selectedItem.IsActive == 1) {
            $("#chkDivisionManagerIsActive").prop('checked', 'checked');
        } else {
            $("#chkDivisionManagerIsActive").removeProp('checked', 'checked');
        }
    }
    
 
 
};