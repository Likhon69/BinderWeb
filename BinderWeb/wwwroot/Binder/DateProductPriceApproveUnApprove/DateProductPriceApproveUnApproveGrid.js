﻿var DateProductPriceGrid = "";
var removeItemArray = [];
var selecteditems = [];
var items = "";


var DateProductPriceSearchGridManager = {

    DateProductPriceSearchDataSource: function (data) {


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
                    id: "ProductPriceId",
                    fields: {
                        ProductPriceId: { type: 'number', editable: true },

                        ProductName: { editable: false },
                        PricingDate: { editable: false },
                        FirstSlotPrice: { editable: true },
                        SecondSlotPrice: { editable: true },
                    }
                },
                //data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    },
};

var DateProductPriceSearchGridHelper = {

    GenerateDateProductPriceSearchGrid: function (ProductPriceId) {
        $("#DateProductPriceGridDiv").kendoGrid({
            dataSource: DateProductPriceSearchGridManager.DateProductPriceSearchDataSource(ProductPriceId),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            persistSelection: true,
          
            columns: DateProductPriceSearchGridHelper.GenerateGridColumns(),
            editable: false,
            //toolbar: ["create"],
            //navigatable: true,
            selectable: "row,multiple",
        change: function (arge) {
                debugger;
                var id = this.selectedKeyNames();
            //    var exists = $.grep(selecteditems, function (n, i) {
            //        return n > id;
            //    });
            //    if (exists.length == 0) {
            //        selecteditems.push(id);
            //    } else {
            //        selecteditems.remove(exists[0]);
            //}
            items = id;
            },

        });
    },
    GenerateGridColumns: function () {
        return columns = [
            { selectable: true, width: "20px" },
            { field: " ProductName", title: "Product Name", width: 100 },
            { field: "PricingDate", title: "Pricing Date", width: 150, template: "#=  kendo.toString(kendo.parseDate(PricingDate),'dd-MMM-yyyy') #"  },
            { field: "FirstSlotPrice", title: "First Slot Price", width: 150 },
            { field: "SecondSlotPrice", title: "Second Slot Price", width: 150 },

        ];

    },
    /*  deleteRow: function () {
  
          var gridProductItems = $("#DateProductPriceGridDiv").data("kendoGrid");
          var selectedItem = gridProductItems.dataItem(gridProductItems.select());
          removeItemArray.push(selectedItem);
  
          gridProductItems.dataSource.remove(selectedItem);
  
          return removeItemArray;
      }*/
    /*checkEventForApproveButton: function () {
        var entityGrid = $("#DateProductPriceGridDiv").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        if (selectedItem != null) {
            DateProductPriceSearchHelper.PopulateDateProductPriceSearch(selectedItem);
        }*/
    }
