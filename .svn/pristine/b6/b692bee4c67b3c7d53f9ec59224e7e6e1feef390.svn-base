
var DeviceSummaryManager = {
    gridDataSource: function (companyId) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../DeviceSettings/GetDeviceInfoSummary/',

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

var DeviceSummaryHelper = {

    GenerateDeviceInfoGrid: function () {
        $("#gridDeviceSummary").kendoGrid({
            dataSource: DeviceSummaryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: DeviceSummaryHelper.GeneratedDeviceInfoColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },


    GeneratedDeviceInfoColumns: function () {
        return columns = [
        { field: "DeviceSetupId", hidden: true },
        { field: "CompanyName", title: "Company Name", width: 80, hidden: false },
        { field: "BranchName", title: "Location Name", width: 80, hidden: false },
        //{ field: "DeviceId", title: "Dev<br>Id", width: '100px', sortable: false },
        { field: "DeviceId", title: "Dev<br>Id", width: 40, sortable: false },
        { field: "IPAddress", title: "IP", width: 80, sortable: false },
        { field: "DeviceType", title: "Device<br>Type", width: 50, sortable: false, hidden: true },
        { field: "Manufacturer", title: "Manufacturer", hidden: false, width: 50 },
        { field: "DeviceModel", title: "Device<br>Model", width: 50, sortable: false },
        { field: "DeviceDescription", title: "Device<br>Description", width: 60, sortable: false, hidden: false },
        { field: "DevicePort", title: "Device<br>Port", width: 50, sortable: false },
        { field: "DeviceUser", title: "Device User", width: 50, sortable: false, hidden: true },
        { field: "DevicePassword", title: "Device Password", width: 50, sortable: false, hidden: true },
        { field: "Status", title: "Status", width: 50, sortable: false, hidden: true },
        { field: "ServiceType", title: "Service<br>Type", width: 50, sortable: false, hidden: false },

      
        { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="DeviceSummaryHelper.clickEventForEditFunction()"/>', sortable: false }
        ];
    },

    clickEventForEditFunction: function () {

        var entityGrid = $("#gridDeviceSummary").data("kendoGrid");

        var selectedItem = entityGrid.dataItem(entityGrid.select());

        DeviceDetailsHelper.PopulateDeviceDetails(selectedItem);

    },
};



