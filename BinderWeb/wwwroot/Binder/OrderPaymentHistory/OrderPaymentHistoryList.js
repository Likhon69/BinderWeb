$(document).ready(function () {


    OrderPaymentHistoryHelper.GenerateProductsGrid();
    $("#btnSearch").click(function () {

        OrderPaymentHistoryHelper.Search();

    });
    $("#btnSaveOk").click(function () {

        PostSocRemarksManager.AddPostSocRemarks();

    });
    $("#searchSoc").keypress(function (e) {
        if (e.keyCode == 13) {
            OrderPaymentHistoryHelper.Search();

        }
    })
    OrderPaymentHistoryHelper.init();
});
var _selectedMaster = null;
var OrderPaymentHistoryManager = {
    gridDataSource: function () {


        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize:10,

            transport: {
                read: {
                    url: binderApi + '/OrderPayment/GetOrderPaymentHistory/?access_token=' + sessionStorage.getItem("token"),

                    type: "POST",


                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },

                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: {
                data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    }

};
var OrderPaymentHistoryHelper = {

    init: function () {
        $("#window").kendoWindow({
            width: "400px",
            title: "Confirmation",
            visible: false,
            actions: [
                "Pin",
                "Minimize",
                "Maximize",
                "Close"
            ],

        });
        OrderPaymentHistoryHelper.GenerateProductsGrid();

        /*$("#txtQuantity").kendoNumericTextBox({
            min: 1,
            format: 'N0'
        });*/

    },

    GenerateProductsGrid: function () {
        debugger;
        $("#GetOrderPaymentHistoryList").kendoGrid({
            dataSource: OrderPaymentHistoryManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: OrderPaymentHistoryHelper.OrderPaymentHistoryColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },
    OrderPaymentHistoryColumns: function () {
        return columns = [
            { field: "OrderId", hidden: true },
            //{ field: "ProductName", title: "ProductName", width: 50 },
            //{ field: "ProductModelName", title: " Model", width: 50, sortable: false },
            { field: "Orderdate", title: "Order Date", width: 100, template: "#=  kendo.toString(kendo.parseDate(Orderdate),'dd-MMM-yyyy') #" },
            { field: "PickupDate", title: "Pickup Date", width: 100, template: "#=  kendo.toString(kendo.parseDate(PickupDate),'dd-MMM-yyyy') #" },
            { field: "UnittPrice", title: "Unit Price", width: 100 },
            { field: "TotalPrice", title: "Total Price", width: 100 },
            { field: "Quantity", title: "Quantity", width: 100 },
            { field: "OrderNo", title: "Order No", width: 100 },
            { field: "SOC", title: "SOC", width: 100 },
            { field: "ChequeDate", title: "Cheque Date", width: 100, template: "#=  kendo.toString(kendo.parseDate(ChequeDate),'dd-MMM-yyyy') #" },
            { field: "PaymentDate", title: "Payment Date", width: 100, template: "#=  kendo.toString(kendo.parseDate(PaymentDate),'dd-MMM-yyyy') #" },
            { field: "DepositDate", title: "Deposit Date", width: 100, template: "#=  kendo.toString(kendo.parseDate(DepositDate),'dd-MMM-yyyy') #" },
            { field: "ChequeNo", title: "Cheque No", width: 100 },
            { field: "PaymentMethod", title: "Payment Method", width: 100 },
            {
                field: "Edit", title: "Confirm", filterable: false, width: 80,
                template: '<button type="button" class="k-button k-primary" value="Confirm" id="undo" onClick="OrderPaymentHistoryHelper.PopUp()" >Confirm</button>', sortable: false
            }


        ];
    },
    Search: function () {

        var grid = $("#GetOrderPaymentHistoryList").data('kendoGrid');
        var filterValue = $("#searchSoc").val();

        grid.dataSource.filter({ field: "OrderNo", operator: "contains", value: filterValue });
    },
    PopUp: function () {
        //var entityGrid = $("#TallyPointSearchDiv").data("kendoGrid");
        //var selectedItem = entityGrid.dataItem(entityGrid.select());
        //if (selectedItem != null) {
        //    TallySocSearchGridHelper.PopulateQuantity(selectedItem);
        //}
        debugger;
        var grid = $("#GetOrderPaymentHistoryList").data('kendoGrid');
      var item = grid.dataItem(grid.select());
        if (item != null) {

            _selectedMaster = item;
            // TallyConfirmationHelper.CreateTallyConfirmationObj(item);



            $("#window").data('kendoWindow').open().center();
        }
    }
}