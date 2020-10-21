

var departmentSummaryManager = {
    
    GenerateDepartmentGridSummary: function () {
        var url = "../Department/GetDepartmentSummaryAll/";
        var column = departmentSummaryHelper.GenerateDepartmentColumns();
        empressCommonManager.GenerateCommonGridWithPaging("gridDepartment", url, column, 20);
    }
};

var departmentSummaryHelper = {

    GenerateDepartmentColumns: function () {
        return columns = [
            { field: "DepartmentCode", title: "Department Code", width: 100 },
            { field: "DepartmentName", title: "Department Name", width: 200 },
            { field: "DepartmentId", hidden: true },
            { field: "Edit", title: "Edit", filterable: false, width: 60, template: "<button class='k-button' type='button' onClick='departmentSummaryHelper.clickEventForEditButton()' ><span class='k-icon k-i-pencil'></span> &nbsp;Edit</button>", sortable: false }
        ];
    },
  
    clickEventForEditDepartment: function () {
        $('#gridDepartment table tr').dblclick( function () {
            var entityGrid = $("#gridDepartment").data("kendoGrid");

            var selectedItem = entityGrid.dataItem(entityGrid.select());

            departmentDetailsHelper.populateDepartmentDetails(selectedItem);

        });
    },

    clickEventForEditButton: function () {
        
        var entityGrid = $("#gridDepartment").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());

        departmentDetailsHelper.populateDepartmentDetails(selectedItem);
    },


};