$(document).ready(function () {
   

    ProductPriceApproveListHelper.GenerateProductsGrid();
});

var ProductPriceApproveListManager = {
    gridDataSource: function () {


        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 5,

            transport: {
                read: {
                    url: binderApi + '/ProductPrice/GetProductPriceList/?access_token=' + sessionStorage.getItem("token"),

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
var ProductPriceApproveListHelper = {

    GenerateProductsGrid: function () {
        debugger;
        $("#GetProductPriceApproveList").kendoGrid({
            dataSource: ProductPriceApproveListManager.gridDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: ProductPriceApproveListHelper.GeneratedProductPriceApproveListColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });
    },
    GeneratedProductPriceApproveListColumns: function () {
        return columns = [
            { field: "ProductsId", hidden: true },
            { field: "ProductName", title: "ProductName", width: 50 },
            //{ field: "ProductModelName", title: " Model", width: 50, sortable: false },
            { field: "PricingDate", title: "Pricing Date", width: 150, template: "#=  kendo.toString(kendo.parseDate(PricingDate),'dd-MMM-yyyy') #" },
            { field: "FirstSlotPrice", title: "First Slot Price", width: 150 },
            { field: "SecondSlotPrice", title: "Second Slot Price", width: 150 },

            //{ field: "IsActive", title: "Status", width: 50, sortable: false, template: "#=IsActive==1?'Active':'In Active'#" },
          

        ];
    }
}