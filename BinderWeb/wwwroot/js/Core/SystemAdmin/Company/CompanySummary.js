var companySummaryManager = {
    
    GenerateCompanyGridSummary: function () {
        var url = "../Company/LoadAllCompanies/";
        var column = companySummaryHelper.GenerateCompanyColumns();
        empressCommonManager.GenerateCommonGridWithPaging("gridCompany", url, column,50);
    }, 
};

var companySummaryHelper = {
    
    GenerateCompanyColumns: function () {
        return columns = [
            { field: "CompanyCode", title: "Company Code", width: 100 },
            { field: "CompanyName", title: "Company Name", width: 100 },
            { field: "Phone", title: "Phone", width: 100 },
            { field: "Email", title: "Email", width: 100 },
            { field: "CompanyId", hidden: true },
            { field: "Address", hidden: true },
            { field: "Fax", hidden: true },
            { field: "ShortLogoPath", hidden: true },
            { field: "FullLogoPath", hidden: true },
            { field: "PrimaryContact", hidden: true },
            { field: "FiscalYearStart", hidden: true },
            { field: "MotherId", hidden: true },
            { field: "Edit", title: "Action", filterable: false, width: 30, template: "<button class='k-button' type='button' onClick='companySummaryHelper.clickEventForEditButton();' ><span class='k-icon k-i-pencil'></span> &nbsp;Edit</button>", sortable: false }

            
        ];
    },
    
    clickEventForEditButton: function () {
        companyDetailsHelper.clearCompanyForm();
        $("#btnSave").text("Update");
        var entityGrid = $("#gridCompany").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            companyHelper.FillCompanyDetailsInForm(selectedItem);
            var objLocationList = empressCommonManager.GenerateBranchCombo(selectedItem.CompanyId);
            var objDepartmentList = empressCommonManager.GetDepartmentByCompanyId(selectedItem.CompanyId);
            var objDesignationList = empressCommonManager.GenerateDesignationCombo(selectedItem.CompanyId);
            var objDivisionList = empressCommonManager.GetDivisionByCompanyId(selectedItem.CompanyId);
            var objFacilityList = empressCommonManager.GetAllActiveFacility();
         
            branchSolutionHelper.PopulateBranchArray(objLocationList);
            departmentSolutionHelper.PopulateDepartmentArray(objDepartmentList);
            designationSolutionHelper.PopulateDessignationArray(objDesignationList);
            DivisionSolutionHelper.PopulateDivisionArray(objDivisionList);
            FacilitySolutionHelper.PopulateFacilityArray(objFacilityList);
            companyDetailsHelper.showHideSbuComanySummaryEdit();
            DivisionSolutionManager.GenerateDivisionDeptMapSolutionGrid(selectedItem.CompanyId);
        }

    }
};