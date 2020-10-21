BranchTypeWithBranchMappingDetailsManager = {

    SaveBranchTypeWithBranchMapping: function () {

        if (BranchTypeWithBranchMappingDetailsHelper.validateSearchItem("BranchTypeWithBranchMappingDetailsDiv")) {
            var obj = BranchTypeWithBranchMappingDetailsHelper.createBranchTypeWithBranchMapping();
            var objInfo = JSON.stringify(obj);
            var jsonParam = 'objBranchTypeForBranchMapping:' + objInfo;
            var serviceUrl = "../BranchTypeWithBranchMapping/SaveBranchTypeWithBranch";
            AjaxManager.SendJson2(serviceUrl, jsonParam, function (jsonData) {
                if (jsonData == "Success") {
                    Message.Success('Mapping Save Successfully');
                    var clear= BranchTypeWithBranchMappingDetailsHelper.clearBranchTypeWithBranchMappingInformation();
                    $("#divBranchTypeWithBranchMappingSummary").data("kendoGrid").dataSource.read();
                } else {
                    Message.Warning(jsonData);
                }
            }, function (error) {
                Message.Warning(error.statusText);
            });

        }
    }



};



BranchTypeWithBranchMappingDetailsHelper = {
    BranchTypeCombo: function () {

        var obj = AjaxManager.GetDataSource("../BranchTypeWithBranchMapping/GetAllBranchTypeComboData");
        $("#txtBranchType").kendoComboBox({
            placeholder: "Select Branch Type",
            dataTextField: "BranchType",
            dataValueField: "BranchTypeId",
            dataSource: obj,
            filter: "contains",
            suggest: true,
            change: function (e) {
                if (this.value() && this.selectedIndex == -1) {
                    this._filterSource({
                        value: this.value(),
                        field: this.options.dataTextField,
                        operator: "contains"
                    });
                    this.select(0);
                    if (this.selectedIndex == -1) {

                        this.text("");
                    }
                }
            }

        });

    },
    BranchNameCombo: function () {

        var obj = AjaxManager.GetDataSource("../Branch/GetAllBranchNameComboData");
        $("#txtBranchName").kendoComboBox({
            placeholder: "Select Branch Name",
            dataTextField: "BranchName",
            dataValueField: "BranchId",
            dataSource: obj,
            filter: "contains",
            suggest: true,
            change: function (e) {
                if (this.value() && this.selectedIndex == -1) {
                    this._filterSource({
                        value: this.value(),
                        field: this.options.dataTextField,
                        operator: "contains"
                    });
                    this.select(0);
                    if (this.selectedIndex == -1) {

                        this.text("");
                    }
                }
            }

        });

    },


    CreatePopUp: function () {
        $("#divBranchTypeChargePopUp").kendoWindow({
            title: "BranchType Wise Allowance Setup",
            resizeable: false,
            width: "50%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false
        });
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

    createBranchTypeWithBranchMapping: function () {

    var objMapping = new Object();
    objMapping.BranchTypeMappingId = $("#hdnBranchMappingId").val();
    objMapping.BranchTypeId = $("#txtBranchType").data("kendoComboBox").value();
    objMapping.BranchId = $("#txtBranchName").data("kendoComboBox").value();
   
    return objMapping;

    },
    clearBranchTypeWithBranchMappingInformation: function () {

        $("#hdnBranchMappingId").val("");
        $("#txtBranchType").data("kendoComboBox").value("");
        $("#txtBranchName").data("kendoComboBox").value("");
        
        $("#BranchTypeWithBranchMappingDetailsDiv > form").kendoValidator();
        $("#BranchTypeWithBranchMappingDetailsDiv").find("span.k-tooltip-validation").hide();


        var status = $(".status");
        status.text("").removeClass("invalid");
    }

};