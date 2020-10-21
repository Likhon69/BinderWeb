var RSMRegionSummaryManager = {
    
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
                    url: '../RSMRegion/GetRsmRegionSummary',
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
var RSMRegionSummaryHelper = {
    initRSMRegionSummary: function () {
        RSMRegionSummaryHelper.GenerateRSMRegionSummaryGrid();
    },
    
    GenerateRSMRegionSummaryGrid: function () {
        $("#gridRSMRegionSummary").kendoGrid({
            dataSource: RSMRegionSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            filterable: true,
            sortable: true,
            columns: RSMRegionSummaryHelper.RSMRegionSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },
    
    RSMRegionSummaryColumns: function () {
        return columns = [
            { field: "RSMRegionId", title: "RSMRegionId", hidden: true },
            { field: "RSMRegionCode", title: "RSM Region Code " },
            { field: "RSMRegionName", title: "RSM Region Name" },
            { field: "IsActive", title: "Is Active", template: '#= IsActive == 0 ? "InActive" :"Active" #' },
            { field: "Edit", title: "Edit", filterable: false, width: 90, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onclick="RSMRegionSummaryHelper.clickEventForEditRSMRegionFunction();"/>', sortable: false }
        ];
   },


    clickEventForEditRSMRegionFunction: function () {
        var gridData = $("#gridRSMRegionSummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        if (selectedItem != null) {
            RSMRegionDetailsHepler.populateRSMRegion(selectedItem);
            RSMRegionDetailsHepler.EditShowRsmRegionDetails();
            RSMRegionDetailsHepler.PopulateRSMRegionManager(selectedItem.RSMRegionId);
        }
    }

};