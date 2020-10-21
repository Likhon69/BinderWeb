
var branchDetailsManager = {
    
    SaveBranchInformation: function () {
        
        if (branchDetailsHelper.ValidateBranchInfoForm()) {

            var objBranch = branchDetailsHelper.CreateBranchObject();

            var objBranchInfo = JSON.stringify(objBranch).replace(/&/g, "^");
            var jsonParam = 'strobjBranch=' + objBranchInfo;
            var serviceUrl = "../Branch/SaveBranch/";
            AjaxManager.SendJson(serviceUrl, jsonParam, onSuccess, onFailed);

        }
        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                
                AjaxManager.MsgBox('success', 'center', 'Success:', 'Branch Saved Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            branchDetailsHelper.clearBranchForm();
                            $("#divgridBranchSummary").data("kendoGrid").dataSource.read();
                            $("#cmbCompanyName").focus();
                        }
                    }]);
            }
            else if (jsonData == "Branch Already Exist") {

                AjaxManager.MsgBox('warning', 'center', 'Alresady Exist:', jsonData,
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
    }

};
$("#cmbDebitAccHead").kendoComboBox();
$("#cmbCreditAccHead").kendoComboBox();
//$("#cmbDivision").kendoComboBox();
//$("#cmbRegion").kendoComboBox();
//$("#cmbArea").kendoComboBox();
var branchDetailsHelper = {
    init: function () {
        alert(12);
        $("#cmbDebitAccHead").kendoComboBox();
        $("#cmbCreditAccHead").kendoComboBox();  
       
    },


    DivisionNameCombo: function () {
       var objDivision = AjaxManager.GetDataSource("../Branch/GetAllDivisionNameForCombo");
        $("#cmbDivision").kendoComboBox({
            placeholder: "Select Division Name",
            dataTextField: "ZoneName",
            dataValueField: "ZoneId",
            dataSource: objDivision,
            filter: "contains",
            suggest: true,
           
        });

    },

    RegionNameCombo: function () {
        var objRegion = AjaxManager.GetDataSource("../Branch/GetAllRegionNameForCombo");
        $("#cmbRegion").kendoComboBox({
            placeholder: "Select Region Name",
            dataTextField: "RegionName",
            dataValueField: "RegionId",
            dataSource: objRegion,
            filter: "contains",
            suggest: true,

        });

    },
   

    AreaNameCombo: function () {
        var objArea = AjaxManager.GetDataSource("../Branch/GetAllAreaNameForCombo");
        $("#cmbArea").kendoComboBox({
            placeholder: "Select Area Name",
            dataTextField: "AreaName",
            dataValueField: "AreaId",
            dataSource: objArea,
            filter: "contains",
            suggest: true,

        });

    },


   

    clearBranchForm: function () {

        $("#btnSaveBranch").text("Save");
        
        $("#hdnBranchId").val("0");
        $("#txtBranchCode").val("");
        $("#txtBranchName").val("");
        $("#txtBranchDescription").val("");
        $("#cmbDivision").data("kendoComboBox").value("");
        $("#cmbRegion").data("kendoComboBox").value("");
        $("#cmbArea").data("kendoComboBox").value("");
        $('#chkHeadOffice').attr('checked', false);
        $('.chkBox').attr('checked', false);
        $('#chkContraEntryApplicable').attr('checked', false);
        $("#cmbDebitAccHead").data("kendoComboBox").value("");
        $("#cmbCreditAccHead").data("kendoComboBox").value("");
        $("#txtBranchAddress").val("");
        $("#liDebitAccHead").hide();
        $("#liCreditAccHead").hide();
        $("#branchDetailsDiv > form").kendoValidator();
        $("#branchDetailsDiv").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");
        
    },
    
    CreateBranchObject: function () {
        //debugger;
        var objbranch = new Object();
        objbranch.BranchId = $("#hdnBranchId").val();
        objbranch.BranchCode = $("#txtBranchCode").val();
        objbranch.BranchName = $("#txtBranchName").val();
        objbranch.BranchDescription = $("#txtBranchDescription").val();
        objbranch.ZoneId = $("#cmbDivision").data("kendoComboBox").value();
        objbranch.RegionId = $("#cmbRegion").data("kendoComboBox").value();
        objbranch.AreaId = $("#cmbArea").data("kendoComboBox").value();
        objbranch.HeadOffice = $("#chkHeadOffice").is(':checked') == true ? 1 : 0;
        objbranch.IsActive = $("#chkIsActiveBranch").is(':checked') == true ? 1 : 0;
        objbranch.ContraEntryApplicable = $("#chkContraEntryApplicable").is(':checked') == true ? 1 : 0;
        objbranch.DebitAccountHead = $("#cmbDebitAccHead").data("kendoComboBox").value();
        if (objbranch.DebitAccountHead == "") {
            objbranch.DebitAccountHead = 0;
        }
        objbranch.CreditAccountHead = $("#cmbCreditAccHead").data("kendoComboBox").value();
        if (objbranch.CreditAccountHead == "") {
            objbranch.CreditAccountHead = 0;
        }
        objbranch.BranchAddress = $("#txtBranchAddress").val();
        
        return objbranch;
    },

    ValidateBranchInfoForm: function () {
        var data = [];
        
        var validator = $("#branchDetailsDiv").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

    populateBranchDetails: function (objBranch) {
        //debugger;
        //branchDetailsHelper.clearBranchForm();
        $("#btnSaveBranch").text("Update");
        $("#hdnBranchId").val(objBranch.BranchId);
        $("#txtBranchName").val(objBranch.BranchName);
        $("#txtBranchCode").val(objBranch.BranchCode);
        $("#txtBranchDescription").val(objBranch.BranchDescription);
        $("#txtBranchAddress").val(objBranch.BranchAddress);
        $("#cmbDivision").data("kendoComboBox").value(objBranch.ZoneId);
        $("#cmbRegion").data("kendoComboBox").value(objBranch.RegionId);
        $("#cmbArea").data("kendoComboBox").value(objBranch.AreaId);
        if (objBranch.HeadOffice == 1) {
            $("#chkHeadOffice").prop('checked', 'checked');
        } else {
            $("#chkHeadOffice").removeProp('checked', 'checked');
        }
        
        if(objBranch.IsActive==1) {
            //$("#chkIsActive").attr('checked', 'checked');
            $('#chkIsActiveBranch').attr('checked', true);
        }else {
            $("#chkIsActiveBranch").removeProp('checked', 'checked');
        }

        if (objBranch.ContraEntryApplicable == 1) {
            $('#chkContraEntryApplicable').attr('checked', true);
            $("#liDebitAccHead").show();
            $("#liCreditAccHead").show();
            $("#cmbDebitAccHead").data("kendoComboBox").value(objBranch.DebitAccountHead);
            $("#cmbCreditAccHead").data("kendoComboBox").value(objBranch.CreditAccountHead);
        } else {
            //$("#chkIsActiveBranch").removeProp('checked', 'checked');
            $("#liDebitAccHead").hide();
            $("#liCreditAccHead").hide();
        }


    },

   
};

