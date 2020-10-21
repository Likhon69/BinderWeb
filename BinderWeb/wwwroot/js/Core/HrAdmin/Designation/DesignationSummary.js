
var designationSummaryManager = {
    
    GenerateDesignationGridSummary: function () {
        var url = "../Designation/GetDesignationSummaryAll/";
        var column = designationSummaryHelper.GeneratedDesignationColumns();
        empressCommonManager.GenerateCommonGridWithPaging("gridDesignationSummary", url, column, 20);
    },
    
};

var designationSummaryHelper = {
    
    GeneratedDesignationColumns: function () {
        return columns = [
        { filed: "DesignationId", title: "DesignationId", width: 50, hidden: true },
        { filed: "ParentDesignationId", title: "ParentDesignationId", width: 50, hidden: true },
        { field: "DesignationCode", title: "Designation Code", width: 120, sortable: true },
        { field: "DesignationName", title: "Designation Name", width: 180, sortable: true },
        { field: "DSortOrder", title: "Sequence", width: 70, sortable: true },
        { field: "Status", title: "Status", width: 50, sortable: true, template: "#= (Status==1) ? 'Active' : 'Inactive' #" },
        { field: "Edit", title: "Edit", filterable: false, width: 70, template: "<button class='k-button' type='button' onClick='designationSummaryHelper.clickEventForEditButton()' ><span class='k-icon k-i-pencil'></span> &nbsp;Edit</button>", sortable:false }
        ];
    }, 
    clickEventForEditButton:function () {
        var entityGrid = $("#gridDesignationSummary").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());
        
        if (selectedItem != null) {
            designationDetailsHelper.populateDesignationDetails(selectedItem);
        }
    }
};