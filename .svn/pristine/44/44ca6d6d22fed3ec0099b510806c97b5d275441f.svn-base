var groupSummaryManager = {
    
    GenerateGroupGrid: function () {
        $("#gridGroup").kendoGrid({
            dataSource: groupSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: groupSummaryHelper.GenerateGroupColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
        });

    },
    
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
                    url: '../Group/GetGroupSummaryByCompanyIdWithPaging/',

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
    },

};

var groupSummaryHelper = {
    GenerateGroupColumns: function () {
        return columns = [
            { field: "GroupName", title: "Group Name", width: 100 },
            { field: "GroupId", hidden: true },
            { field: "IsDefault", hidden: true },
            { field: "Edit", title: "Edit Group", filterable: false, width: 40, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="groupSummaryHelper.clickEventForEditButton()"  />', sortable:false }
        ];
    },
    clickEventForEditGroup: function () {
        $('#gridGroup table tr').dblclick( function () {


            groupDetailsHelper.clearGroupForm();
         

            var entityGrid = $("#gridGroup").data("kendoGrid");

            var selectedItem = entityGrid.dataItem(entityGrid.select());

            groupInfoHelper.populateGroupInformationDetails(selectedItem);

            groupPermisionHelper.PopulateExistingModule(selectedItem);

        });
    },
    clickEventForEditButton: function () {
        groupDetailsHelper.clearGroupForm();
        $("#btnSave").text("Update");
        var entityGrid = $("#gridGroup").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());

        groupInfoHelper.populateGroupInformationDetails(selectedItem);

        groupPermisionHelper.PopulateExistingModule(selectedItem);
    }
};