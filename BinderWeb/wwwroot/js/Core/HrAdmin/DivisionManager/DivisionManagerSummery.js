var DivisionManagerMapManager = {
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
                    url: '../DivisionManagerSettings/GetDivisionManagerMapSummary/',

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

var DivisionManagerMapHelper = {

    GeneratDivisionManagerMapSummaryGrid: function () {

        $("#gridDivisionManagerMap").kendoGrid({
            dataSource: DivisionManagerMapManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: DivisionManagerMapHelper.DivisionManagerMapSummaryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },

    DivisionManagerMapSummaryColumns: function () {
        return columns = [
          { field: "DivisionManagerMapId", title: "DivisionManagerMapId",   hidden: true },
          { field: "DivisionManagerId", title: "DivisionManagerId",   hidden: true },
          { field: "DivisionId", title: "DivisionId",   hidden: true },
          { field: "EmployeeId", title: "Employee<br> ID", width: 50, },
          { field: "EmployeeName", title: "Employee<br> Name", width: 50,  },
          { field: "DivisionName", title: "Division<br> Name", width: 50, },
          { field: "EffectiveDate", title: "Effective<br> Date", width: 80, template: "#=kendo.toString(kendo.parseDate(EffectiveDate),'dd/MM/yyyy')=='01/01/0001'?'': kendo.toString(kendo.parseDate(EffectiveDate),'dd MMM yyyy')#" },
          { field: "EndDate", title: "End<br> Date", width: 60, template: "#=kendo.toString(kendo.parseDate(EndDate),'dd/MM/yyyy')=='01/01/0001'?'': kendo.toString(kendo.parseDate(EndDate),'dd MMM yyyy')#" },
          { field: "IsActive", title: "Is<br> Active", width: 40, template: '#=IsActive == 0 ? "InActive" : "Active"#' },
          { field: "Edit", title: "Action", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="DivisionManagerMapHelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },

    clickEventForEditFunction: function () {
        var gridData = $("#gridDivisionManagerMap").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        DivisionManagerDetailsHelper.populateMappingDetails(selectedItem);
    }
};