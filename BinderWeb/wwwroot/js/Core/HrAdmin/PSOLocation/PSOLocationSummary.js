 

PSOLocationSummaryManager = {
    
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
                    url: '../PSOLocation/GetPsoLocationSummary',
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
    }
};


PSOLocationSummaryHelper = {
    initPSOLocationSummary: function() {
        PSOLocationSummaryHelper.GeneratePSOLocationSummaryGrid();
    },
    
    GeneratePSOLocationSummaryGrid: function () {
        $("#gridPSOLocationSummary").kendoGrid({
            dataSource: PSOLocationSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: true,
            sortable: true,
            columns: PSOLocationSummaryHelper.PSOLocationSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },
    
   PSOLocationSummaryColumns: function () {
        return columns = [
            { field: "PSOLocationId", title: "PSOLocationId", hidden: true },
            { field: "PSOLocationCode", title: "PSO Location Code " },
            { field: "PSOLocationName", title: "PSO Location Name" },
            { field: "DSMLocationCode", title: "DSM Location Code" },
            { field: "IsActive", title: "Is Active", template: '#= IsActive == 0 ? "InActive" :"Active" #' },
            { field: "Edit", title: "Edit", filterable: false, width: 90, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onclick="PSOLocationSummaryHelper.clickEventForEditPSOLocationFunction()"/>', sortable: false }
        ];
   },


   clickEventForEditPSOLocationFunction: function () {
      var gridData = $("#gridPSOLocationSummary").data("kendoGrid");
       var selectedItem = gridData.dataItem(gridData.select());
       PSOLocationDetailsHepler.populatePSOLocation(selectedItem);
   },

};