

$(document).ready(function () {
    $("#tabPublishCompanySettings").kendoTabStrip({
        animation: { close: { effects: "fadeOut" }, open: { effects: "fadeIn" } }
    });
    companySummaryManager.GenerateCompanyGridSummary();
    companyDetailsHelper.GenerateFiscalYearCombo();
    companyDetailsHelper.GenerateMotherCompanyCombo();
    companyManager.GeRowDataOfCompanyGrid();
    companyDetailsManager.logoUpload();
    companyDetailsManager.logoUploadForReport();
    $("#txtCompanyName").focus();

    branchSolutionHelper.initiateBranchSolution();
    DivisionSolutionHelper.initiateDivisionSolution();
    departmentSolutionHelper.initiateDepartmentSolution();
    FacilitySolutionHelper.initiateFacilitySolution();
    designationSolutionHelper.initiateDesignationSolution();

   
});

var companyManager = {

    GeRowDataOfCompanyGrid: function () {
        $('#gridCompany table tr').dblclick( function () {
            
            var entityGrid = $("#gridCompany").data("kendoGrid");
            var selectedItem = entityGrid.dataItem(entityGrid.select());
            companyHelper.FillCompanyDetailsInForm(selectedItem);
        });

    },

    
};

var companyHelper = {
    FillCompanyDetailsInForm: function (objCompany) {
     

        $('#hfCompanyId').val(objCompany.CompanyId);
        $("#txtCompanyName").val(objCompany.CompanyName);
        $("#txtSbuCode").val(objCompany.CompanyCode);
        $("#txtAddress").val(objCompany.Address);
        $("#txtPhone").val(objCompany.Phone);
        $("#txtFax").val(objCompany.Fax);
        $("#txtEmail").val(objCompany.Email);
        $("#txtExpenseGL").val(objCompany.ExpenseGL);
        $("#txtPrimaryContact").val(objCompany.PrimaryContact);
        var cmbMotherCompany = $("#cmbMotherCompany").data("kendoComboBox");
        cmbMotherCompany.value("");
        
        //var list = 0;
        //for (var i = 0; i < cmbMotherCompany.dataSource._data.length;i++) {
        //    if(cmbMotherCompany.dataSource._data[i].CompanyId == objCompany.CompanyId) {
        //        list = i;
        //        break;
        //    }
        //}
        //if(i!= 0) {
        //    var itemToRemove = cmbMotherCompany.dataSource.at(list);
        //    cmbMotherCompany.dataSource.remove(itemToRemove);
        //}

        companyDetailsHelper.GetMotherCompanyForEditCompanyCombo(objCompany.CompanyId);


        if (objCompany.MotherId != 0) {
            cmbMotherCompany.value(objCompany.MotherId);
        }
       
        if(objCompany.IsActive==1) {
            $("#chkIsActive").prop('checked', 'checked');
        }else {
            $("#chkIsActive").removeProp('checked', 'checked');
        }
        
        var ddlFiscalYearStart = $("#ddlFiscalYearStart").data("kendoDropDownList");
        ddlFiscalYearStart.value(objCompany.FiscalYearStart);
        $("#hfFullLogoPath").val(objCompany.FullLogoPath);
    }
};


