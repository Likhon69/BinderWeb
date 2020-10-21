
var designationDetailsManager = {
    

    SaveDesignationInformation: function () {

        if (designationDetailsHelper.ValidateDesignationInfoForm()) {

            var objDesignation = designationDetailsHelper.CreateDesignationObject();

            var objDesignationInfo = JSON.stringify(objDesignation).replace(/&/g, "^");
            var jsonParam = 'strobjDesignation=' + objDesignationInfo;
            var serviceUrl = "../Designation/SaveDesignation/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);

        }
        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Designation Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            designationDetailsHelper.clearDesignationForm();
                            $("#gridDesignationSummary").data("kendoGrid").dataSource.read();
                            $("#txtDesignationCode").focus();
                            $("#cmbJobTitle").data("kendoComboBox").dataSource.read();
                        }
                    }]);
            }
            else if (jsonData == "Already Exist") {
                AjaxManager.MsgBox('warning', 'center', 'Warning:', 'Designation Already Exist',
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
            AjaxManager.MsgBox('error', 'center', 'Failed', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    },
    getAllDesignationType: function () {
       
        var objCompany = "";
        var jsonParam = "";
        var serviceUrl = "../Designation/GetAllDesignationTypeComboData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objCompany = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objCompany;
    },

};

var designationDetailsHelper = {
   
    clearDesignationForm: function () {
        $("#btnSaveDesignation").text("Save");

        $("#hdnDesignationId").val("0");
        $("#txtDesignationCode").val("");
        $("#txtSortOrder").data("kendoNumericTextBox").value("0");
        $("#txtDesignationName").val("");
        $('#chkIsActiveDesignation').attr('checked', false);
        $("#cmbParentDesignationName").data("kendoComboBox").value("");
        $("#designationDetailsDiv > form").kendoValidator();
        $("#designationDetailsDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");
        $("#cmbDesigType").data("kendoComboBox").value("");
     
    },
    CreateDesignationObject: function () {
        
        var objDesignation = new Object();
        objDesignation.DesignationId = $("#hdnDesignationId").val();
        objDesignation.DesignationCode = $("#txtDesignationCode").val();
        objDesignation.DesignationName = $("#txtDesignationName").val();
        objDesignation.Status = $("#chkIsActiveDesignation").is(':checked') == true ? 1 : 0;
        objDesignation.DSortOrder = $("#txtSortOrder").data("kendoNumericTextBox").value();
        objDesignation.ParentDesignationId = $("#cmbParentDesignationName").data("kendoComboBox").value();
        
        objDesignation.DesignationTypeId = $("#cmbDesigType").val()>0?$("#cmbDesigType").val():0;

        if (objDesignation.ParentDesignationId == "") {
            objDesignation.ParentDesignationId = 0;
        }
        return objDesignation;
    },

    ValidateDesignationInfoForm: function () {
        var data = [];

        var validator = $("#designationDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

    populateDesignationDetails: function (objDesignation) {
      
        if (objDesignation != null) {
            designationDetailsHelper.clearDesignationForm();
            $("#btnSaveDesignation").text("Update");
            $("#txtSortOrder").data("kendoNumericTextBox").value(objDesignation.DSortOrder);
            if (objDesignation.Status == 1) {
                $("#chkIsActiveDesignation").prop('checked', 'checked');
            } else {
                $("#chkIsActiveDesignation").removeProp('checked', 'checked');
            }
             
            $("#hdnDesignationId").val(objDesignation.DesignationId);
            $("#txtDesignationName").val(objDesignation.DesignationName);
            $("#txtDesignationCode").val(objDesignation.DesignationCode);
            //$("#cmbDesigType").data("kendoDropDownList").value(objDesignation.Type);
        //    designationDetailsHelper.populateAllDesignationType();
            $("#cmbParentDesignationName").data("kendoComboBox").value(objDesignation.ParentDesignationId);
            $("#cmbDesigType").data("kendoComboBox").value(objDesignation.DesignationTypeId);


        }
    },
    
    designationTytepeopup: function () {
        $("#designationTypePopup").kendoWindow({
            title: "Designation Type Entry",
            resizeable: false,
            width: "50%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
    },
 
    clickEventForAddButton: function () {
        $("#designationTypePopup").data("kendoWindow").open().center();
    },

    initiate: function () {
        designationDetailsHelper.designationTytepeopup();
    },
    clickEventForPopupCloseButton: function () {
        $("#designationTypePopup").data("kendoWindow").close();
        $("#txtDesigType").val("");
    },

    saveDesignationType: function () {
            var desigType = $("#txtDesigType").val();
            var jsonParam = 'desigType=' + desigType;
            var serviceUrl = "../Designation/AddDesignationType/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Successfully Added',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            //leavePolicyExceptionDetailHelper.clearDetailForm();
                            //$("#gridLeavePolicyExceptionSummary").data("kendoGrid").dataSource.read();
                        }
                    }]);
                designationDetailsHelper.populateAllDesignationType();
                $('#txtDesigType').val("");
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
    },
  
   

    populateAllDesignationType: function () {
        var obj = new Object();
        obj = designationDetailsManager.getAllDesignationType();
        $("#cmbDesigType").kendoComboBox({
            placeholder: "Select Designation Type",
            dataTextField: "TypeName",
            dataValueField: "DesignationTypeId",
            dataSource: obj,
            filter: "contains",
            suggest: true
        });
    },

};

$(document).ready(function() {
    designationDetailsHelper.initiate();
    $("#btnDesignationType").click(function () {
        designationDetailsHelper.clickEventForAddButton();
    }); 
    $("#btnDesignationTypeClose").click(function () {
        designationDetailsHelper.clickEventForPopupCloseButton();
    });
    $("#btnDesignationTypeAdd").click(function () {
        designationDetailsHelper.saveDesignationType();
    });
    designationDetailsHelper.populateAllDesignationType();
});

