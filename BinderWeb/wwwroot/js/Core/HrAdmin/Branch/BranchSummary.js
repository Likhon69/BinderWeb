
var branchSummaryManager = {
    
    GenerateBranchGrid: function () {
        $("#cmbDebitAccHead").kendoComboBox();
        $("#cmbCreditAccHead").kendoComboBox();

        var url = "../Branch/GetAllBranchSummary/";
        var column = branchSummaryHelper.GeneratedBranchColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridBranchSummary", url, column, 50);
    },

   
};

var branchSummaryHelper = {
    
    GeneratedBranchColumns: function () {
        return columns = [
        { filed: "BranchId", title: "BranchId", width: 50, hidden: true },
        { field: "BranchCode", title: "Branch/Location Code", width: 150, sortable: true },
        { field: "BranchName", title: "Branch/Location Name", width: 170, sortable: true },
        { field: "BranchDescription", title: "Branch/Location Description", width: 170, sortable: false },
        {
            field: "Edit", title: "Edit", filterable: false, width: 70, template:
        "<button class='k-button' type='button' onClick='branchSummaryHelper.clickEventForEditButton()' ><span class='k-icon k-i-pencil'></span> &nbsp;Edit</button>", sortable: false
        }
        ];
    },
    clickEventForEditBranch: function () {
        $('#divgridBranchSummary table tr').dblclick( function () {
            var entityGrid = $("#divgridBranchSummary").data("kendoGrid");

            var selectedItem = entityGrid.dataItem(entityGrid.select());

            branchDetailsHelper.populateBranchDetails(selectedItem);
        });
    },
    
    clickEventForEditButton: function () {
        
       
        var entityGrid = $("#divgridBranchSummary").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());

        branchDetailsHelper.populateBranchDetails(selectedItem);
    }
};