var DateProductPriceGrid = "";
var removeItemArray = [];

var DateProductPriceGridManager = {

    DateProductPriceDataSource: function (data) {


        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            batch: true,
            data: data,
            //transport: {

            //    read: {
            //        url: '/ProductPrice/GenerateProductPrice',
            //        type: "POST",
            //        dataType: "json",
            //        cache: false,
            //        async: false,
            //        contentType: "application/json; charset=utf-8"

            //    },

            //    parameterMap: function (options, operation) {
            //        if (operation !== "read" && options.models) {
            //            return { models: kendo.stringify(options.models) };
            //        }
            //        return JSON.stringify(options);
            //    }
            //},

            schema: {
                model: {
                    id: "productId",
                    fields: {
                        productId: { type: 'number', editable: true },

                        ProductName: { editable: false },
                        PricingDate: { editable: false },
                        FirstSlotPrice: { editable: true, type: 'number' },
                        SecondSlotPrice: { editable: true, type: 'number' },
                    }
                },
                //data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    },
};

var DateProductPriceGridHelper = {

    GenerateDateProductPriceGrid: function (ProductId) {
        $("#DateProductPriceGridDiv").kendoGrid({
            dataSource: DateProductPriceGridManager.DateProductPriceDataSource(ProductId),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: false,
            sortable: true,
            columns: DateProductPriceGridHelper.GenerateGridColumns(),
            editable: true,
            //toolbar: ["create"],
            //navigatable: true,
            selectable: "row,multiple",
            //dataBound: function (e) {

            //}

        });
    },
    GenerateGridColumns: function () {
        return columns = [
            { field: "ProductName", title: "Product Name", width: 100 },
            { field: "PricingDate", title: "Pricing Date", width: 150, template: "#=  kendo.toString(kendo.parseDate(PricingDate),'dd-MMM-yyyy') #" },
            { field: "FirstSlotPrice", title: "First Slot Price", width: 150 },
            { field: "SecondSlotPrice", title: "Second Slot Price", width: 150 },

        ];

    }
    /*  deleteRow: function () {
  
          var gridProductItems = $("#DateProductPriceGridDiv").data("kendoGrid");
          var selectedItem = gridProductItems.dataItem(gridProductItems.select());
          removeItemArray.push(selectedItem);
  
          gridProductItems.dataSource.remove(selectedItem);
  
          return removeItemArray;
      }*/
};