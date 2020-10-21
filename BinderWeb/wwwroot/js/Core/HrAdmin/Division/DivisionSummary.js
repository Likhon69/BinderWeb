var DivisionSummaryManager = {
    
    gridDataSource: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            transport: {
                read: {
                    url: '../Division/GetDivisionSummary',
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options) {
                    return JSON.stringify(options);
                }
            },
            schema: { data: "Items", total: "TotalCount" }

        });
        return gridDataSource;
    },



};
var DivisionSummaryHelper = {
    initDivisionSummary: function() {
        DivisionSummaryHelper.GenerateDivisionSummaryGrid();
    },
    
    GenerateDivisionSummaryGrid: function () {
        $("#gridDivisionSummary").kendoGrid({
            dataSource: DivisionSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: true,
            sortable: true,
            columns: DivisionSummaryHelper.DivisionSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },
    
   DivisionSummaryColumns: function () {
        return columns = [
            { field: "DivisionId", title: "DivisionId", width: 50, hidden: true },
            { field: "DivisionCode", title: "Division Code ", width: 75 },
            { field: "DivisionName", title: "Division Name", width: 70 },
            { field: "IsActive", title: "Is Active", width: 50, template: '#= IsActive == 0 ? "InActive" :"Active" #' },
            { field: "Edit", title: "Edit", filterable: false, width: 50, template: "<button class='k-button' type='button' onClick='DivisionSummaryHelper.clickEventForEditDivisionFunction()' ><span class='k-icon k-i-pencil'></span> &nbsp;Edit</button>", sortable: false }
 
        ];
   },


   clickEventForEditDivisionFunction: function () {
       var gridData = $("#gridDivisionSummary").data("kendoGrid");
       var selectedItem = gridData.dataItem(gridData.select());
       DivisionDetailsHepler.populateDivision(selectedItem);



   },

};