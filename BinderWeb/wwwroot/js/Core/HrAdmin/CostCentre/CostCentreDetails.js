
var CostCentreManager = {
    SaveCostCentre: function () {

        var validator = $("#CCostCentreDetailsDiv").kendoValidator().data("kendoValidator"),
           status = $(".status");
        
        if (validator.validate()) {
            var objCostCentre = CostCentreHelper.CreateCostCentreObject();
            var objobjCostCentreinfo = JSON.stringify(objCostCentre).replace(/&/g, "^");

            var jsonParam = "strCostCentre=" + objobjCostCentreinfo;
            var serviceUrl = "../CostCentre/SaveAndUpdateCostCentre/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);
        }


        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Cost Centre Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            CostCentreHelper.populateParentCostCentreCombo();
                            $("#gridCostCentre").data("kendoGrid").dataSource.read();
                            CostCentreHelper.clearCostCentre();
                        }
                    }]);
            }
            else if (jsonData == "Exist") {

                AjaxManager.MsgBox('warning', 'center', 'Alresady Exist:', 'Cost Centre Name Already Exist !!!',
                      [{
                          addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                              $noty.close();
                          }
                      }]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
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
    },

    GenerateParentCostCentreCombobyCompanyId: function () {

        var objparentCostCentre = "";
        var jsonParam = "";
        var serviceUrl = "../CostCentre/GetCostCentreDataForComboByCompanyId/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {

            objparentCostCentre = jsonData;
        }
        function onFailed() {
            window.alert(error.statusText);
        }

        return objparentCostCentre;
    }

};

var CostCentreHelper = {


    initiateCostCentre: function () {

        //empressCommonHelper.GenerareHierarchyCompanyCombo("cmbCompanyNameDetails");

        //if (CurrentUser.CompanyId != null) {
        //    var companyData = $("#cmbCompanyNameDetails").data("kendoComboBox");
        //    companyData.value(CurrentUser.CompanyId);
        //    CostCentreHelper.changeCompanyName();
        //    // CostCentreHelper.populateParentCostCentreCombo();
        //}


    },

    populateParentCostCentreCombo: function () {

        var objCostCentre = new Object();
        objCostCentre = CostCentreManager.GenerateParentCostCentreCombobyCompanyId();
        $("#cmbParentCostCentre").kendoComboBox({
            placeholder: "Select Parent Cost Centre Name",
            dataTextField: "CostCentreName",
            dataValueField: "CostCentreId",
            dataSource: objCostCentre,

        });

    },

    clearCostCentre: function () {
        $("#btnSave").text("Save");
        
        $("#hdnCostCentreId").val(0);

        $("#txtCostCentreName").val("");

        $("#txtCostCentreCode").val("");
        $("#txtCrossCentreDescription").val("");

        $('input[type = "checkbox"]').attr('checked', false);
        
        $("#txtSJV_Number").val('');


        $("#CCostCentreDetailsDiv > form").kendoValidator();
        $("#CCostCentreDetailsDiv").find("span.k-tooltip-validation").hide();

        var status = $(".status");
        status.text("").removeClass("invalid");

    },

    ValidateCostCentreInfoForm: function () {
        var data = [];

        var validator = $("#CCostCentreDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;

        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },



    CreateCostCentreObject: function () {
        var objDataSource = new Object();
        objDataSource.CostCentreId = $("#hdnCostCentreId").val();
        objDataSource.CostCentreName = $("#txtCostCentreName").val();
        objDataSource.CostCentreCode = $("#txtCostCentreCode").val();
        var parentCostCentreId = $("#cmbParentCostCentre").val();
        objDataSource.ParentCostCentreId = parentCostCentreId == "" ? 0 : parentCostCentreId;
        objDataSource.CcDescription = $("#txtCrossCentreDescription").val();
        objDataSource.IsActive = $("#chkIsActive").is(":checked") == true ? 1 : 0;
        objDataSource.SJV_Number = $("#txtSJV_Number").val();
        objDataSource.ChiledCostRation = $("#txtChiledCostRatio").val();
        if (objDataSource.ChiledCostRation == "") {
            objDataSource.ChiledCostRation = 0;
        }
        return objDataSource;
    },

    FillCostCentreDetailsForm: function (selectedItem) {
        CostCentreHelper.clearCostCentre();
        $("#btnSave").text("Update");
        
        $("#CostcentreDetailsPopupWindow").data("kendoWindow").open().center();
        $("#hdnCostCentreId").val(selectedItem.CostCentreId);
        $("#txtCostCentreName").val(selectedItem.CostCentreName);
        $("#txtCostCentreCode").val(selectedItem.CostCentreCode);
        if (selectedItem.ParentCostCentreId != 0) {
            var parentCostCentreId = $("#cmbParentCostCentre").data("kendoComboBox");
            parentCostCentreId.value(selectedItem.ParentCostCentreId);
        }

        if (selectedItem.IsActive == 1) {
            $("#chkIsActive").prop('checked', 'checked');
        } else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }

        $("#txtCrossCentreDescription").val(selectedItem.CcDescription);
        $("#txtSJV_Number").val(selectedItem.SJV_Number);
        $("#txtChiledCostRatio").val(selectedItem.ChiledCostRation);
        //CostCentreSummaryHelper.hideFields();
    },

};