

var AccessRestrictionParamManager = {
    
    SearchEmploymentInformationByEmployeeCode: function () {
        if (AccessRestrictionParamHelper.validateSearchItem("divAccessRestriction")) {
            var employeeCode = $("#txtEmployeeCode").val();
            var param = "employeeId=" + employeeCode;
            var serviceUrl = "../Employee/GetEmploymentByEmployeeId";
            AjaxManager.GetJsonResult(serviceUrl, param, false, false, onSuccess, onFailed);
        }
        function onSuccess(jsonData) {


            if (jsonData != null) {

                AccessRestrictionParamHelper.populateEmploymentInformationData(jsonData);
            }
            else {
                AjaxManager.MsgBox('warning', 'center', 'Error', "No data found",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        AccessRestrictionHelper.clearAccessRestriction();

                    }
                }]);
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

    },
};

var AccessRestrictionParamHelper = {

    initiateAccessRestrictionParam: function () {
        $("#btnSearch").click(function () { AccessRestrictionParamManager.SearchEmploymentInformationByEmployeeCode(); });

        $("#txtEmployeeCode").keypress(function (event) {
            
            if (event.keyCode == 13) {
                var employeeCode = $("#txtEmployeeCode").val();
                if (employeeCode != '') {
                    AccessRestrictionParamManager.SearchEmploymentInformationByEmployeeCode();
                }
                else {

                }
            }
        });
    },
    
    populateEmploymentInformationData: function (jsonData) {
       
        $("#hdnHrRecordId").val(jsonData.HrRecordId);
        $("#lblEmployeeName").html(jsonData.EmployeeName);
        $("#lblCompanyName").html(jsonData.CompanyName);
        $("#lblBranchName").html(jsonData.BranchName);
        $("#lblDepartmentName").html(jsonData.DepartmentName);
        $("#lblDesignation").html(jsonData.DesignationName); 
        $("#lblDivision").html(jsonData.DivisionName);

        AccessRestrictionParamHelper.PopulateExistingData(jsonData);
    },
    
    clearEmploymentInformation: function() {
        $("#EmployeeCode").val("");
        $("#hdnHrRecordId").val("0");
        $("#lblEmployeeName").html("");
        $("#lblCompanyName").html("");
        $("#lblBranchName").html("");
        $("#lblDepartmentName").html("");
        $("#lblDesignation").html("");
        $("#lblDivision").html("");

        

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
    
    PopulateExistingData: function (jsonData) {

        var restrciton = $("#ddlRestrictionType").data("kendoDropDownList").value();
        var objCompanyData = AccessRestrictionCompanyManager.GetCompanyData(jsonData.HrRecordId, restrciton);

        if (objCompanyData.length > 0) {
            AccessRestrictionCompanyHelper.PolulateCompanyArray(objCompanyData);
        }

        var objBranchData = AccessRestrictionBranchManager.GetBranchInformation(jsonData.HrRecordId, restrciton);
        if (objBranchData.length > 0) {

            AccessRestrictionBranchHelper.PolulateBranchArray(objBranchData);
            var objDepartmentData = AccessRestrictionDepartmentManager.GetDepartmentInformation(jsonData.HrRecordId, restrciton);
            if (objDepartmentData.length > 0) {
                AccessRestrictionDepartmentHelper.PopulateDepartmentArray(objDepartmentData);
            }

        }

        var objDivisionData = accessRestrictionDivisionManager.GetDivisionInformation(jsonData.HrRecordId, restrciton);
        if (objDivisionData.length > 0) {
            accessRestrictionDivisionHelper.PopulateDivisionArray(objDivisionData);
        }
        //----
        var objCostCenterData = accessRestrictionCostCenterManager.GetCostCenterInformation(jsonData.HrRecordId, restrciton);

           // accessRestrictionDivisionManager.GetDivisionInformation();
        if (objCostCenterData.length > 0) {
            accessRestrictionCostCenterHelper.PopulateCostCenterArray(objCostCenterData);
        }
        var objRsmRegion = accessRestrictionRsmRegionManager.GetRsmRegionInformation(jsonData.HrRecordId, restrciton);
        if (objRsmRegion.length > 0) {
            accessRestrictionRsmRegionHelper.PopulateRsmRegionArray(objRsmRegion);
        }
        //new
        var objFunctionData = accessRestrictionFunctionManager.GetFunctionInformation(jsonData.HrRecordId, restrciton);
        if (objBranchData.length > 0) {
            accessRestrictionFunctionHelper.PopulateFunctionArray(objFunctionData);
        }

        var objFacility = accessRestrictionFacililtyManager.GetFacililtyInformation(jsonData.HrRecordId, restrciton);
        if (objFacility.length > 0) {
            accessRestrictionFacilityHelper.PopulateFacilityArray(objFacility);
        }

        var objSection = accessRestrictionSectionManager.GetSectionInformation(jsonData.HrRecordId, restrciton);
        if (objSection.length > 0) {
            accessRestrictionSectionHelper.PopulateSectionArray(objSection);
        }
        
        var objGradeData = accessRestrictionGradeManager.GetGradeInformation(jsonData.HrRecordId, restrciton);
        if (objGradeData.length > 0) {
            accessRestrictionGradeHelper.PopulateGradeArray(objGradeData);
        }
    },
    
    PopulateExistingDataForGroup: function () {
      
        //For Clear existing data
          $("#gridCompany").data("kendoGrid").dataSource.read();
        gbBranchListArray = [];
        gbDepartmentListArray = [];
        gbSelectedCompanyList = [];
        gbDivisionListArray = [];
        gbFunctionListArray = [];
        gbGradeListArray = [];
        if ($("#gridDeprtment").data("kendoGrid") != undefined) {
            $("#gridDeprtment").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridBranch").data("kendoGrid") != undefined) {
            $("#gridBranch").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridDivision").data("kendoGrid") != undefined) {
            $("#gridDivision").data("kendoGrid").dataSource.data([]);
        }
        if ($("#gridFunction").data("kendoGrid") != undefined) {
            $("#gridFunction").data("kendoGrid").dataSource.data([]);
        }

        //


        var groupId = $("#dlGroup").data("kendoComboBox").value();
        if (groupId == "") {
            groupId = 0;
        }
        var restrciton = $("#ddlRestrictionType").data("kendoDropDownList").value();
        
        var objCompanyData = AccessRestrictionCompanyManager.GetCompanyData(groupId, restrciton);

        if (objCompanyData.length > 0) {
            AccessRestrictionCompanyHelper.PolulateCompanyArray(objCompanyData, restrciton);
        }
 
        var objBranchData = AccessRestrictionBranchManager.GetBranchInformation(groupId, restrciton);
        if (objBranchData.length > 0) {

            AccessRestrictionBranchHelper.PolulateBranchArray(objBranchData);
            
            var objDepartmentData = AccessRestrictionDepartmentManager.GetDepartmentInformation(groupId, restrciton);
            if (objDepartmentData.length > 0) {
                AccessRestrictionDepartmentHelper.PopulateDepartmentArray(objDepartmentData);
            }
        }
        //new

        var objDivisionData = accessRestrictionDivisionManager.GetDivisionInformation(groupId, restrciton);
        if (objDivisionData.length > 0) {
            accessRestrictionDivisionHelper.PopulateDivisionArray(objDivisionData);
        }
        //
    
        var objFunctionData = accessRestrictionFunctionManager.GetFunctionInformation(groupId, restrciton);
        if (objBranchData.length > 0) {
            accessRestrictionFunctionHelper.PopulateFunctionArray(objFunctionData);
        }
        //----
        var objCostCenterData = accessRestrictionCostCenterManager.GetCostCenterInformation(groupId, restrciton);

        // accessRestrictionDivisionManager.GetDivisionInformation();
        if (objCostCenterData.length > 0) {
            accessRestrictionCostCenterHelper.PopulateCostCenterArray(objCostCenterData);
        }
        var objRsmRegion = accessRestrictionRsmRegionManager.GetRsmRegionInformation(groupId, restrciton);
        if (objRsmRegion.length > 0) {
            accessRestrictionRsmRegionHelper.PopulateRsmRegionArray(objRsmRegion);
        }
        
        var objGradeData = accessRestrictionGradeManager.GetGradeInformation(groupId, restrciton);
        if (objGradeData.length > 0) {
            accessRestrictionGradeHelper.PopulateGradeArray(objGradeData);
        }

    }

};