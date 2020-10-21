var BranchManagerSummaryManager = {
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
                    url: '../BranchManagerSetting/GetBranchManagerSummary/',

                    type: "POST",

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

var BranchManagerSummaryHelper = {
    GenerateBranchManagerGrid: function () {
        
        $("#BranchManagerSummaryDiv").kendoGrid({
            dataSource: BranchManagerSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: BranchManagerSummaryHelper.GeneratedBranchManagerColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },

    GeneratedBranchManagerColumns: function () {
        return columns = [
        { field: "hdnHrRecordId", hidden: true },
        { field: "ZoneName", title: "Division", width: 50, sortable: false },
        { field: "RegionName", title: "Region", width: 50, sortable: false },
        { field: "AreaName", title: "Area", width: 50, sortable: false },
        { field: "BranchName", title: "Branch", width: 50, sortable: false },
        { field: "EmployeeId", title: "Employee Id", width: 50, sortable: true },
        { field: "IsManager", title: "Is Manager", width: 50, sortable: false, template: "#=IsManager==1?'Manager':'Sub Manager'#" },
        { field: "EffectiveDate", title: "Effective Date", width: 50, filterable: true, template: '#=kendo.toString(kendo.parseDate(EffectiveDate),"dd-MMM-yy") #' },
        { field: "EndDate", title: "End Date", width: 50, filterable: true, template: '#=kendo.toString(kendo.parseDate(EndDate),"dd-MMM-yy") #' },
        { field: "IsActive", title: "Status", width: 50, sortable: false, template: "#=IsActive==1?'Active':'In Active'#" },
        
        { field: "Edit", title: "Edit", filterable: false, width: 30, template: '<button type="button" class="k-button" value="Edit" id="btnEdit" onClick="BranchManagerSummaryHelper.clickEventForEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false }

        ];
    },

    clickEventForEditButton: function () {

        var entityGrid = $("#BranchManagerSummaryDiv").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            BranchManagerSettingsHelper.populateBranchManagerInfo(selectedItem);
        }

    }
};