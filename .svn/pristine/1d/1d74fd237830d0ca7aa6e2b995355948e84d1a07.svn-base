var DateProductPriceGrid = "";
var removeItemArray = [];
var selecteditems = [];
var items = "";
var _selectedMaster = null;


var TallySocSearchGridManager = {

    TallySocSearchDataSource: function (data) {

        debugger;
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

                    fields: {


                        DealerName: { editable: false },
                        OrderDate: { editable: false },
                        Quantity: { editable: true },
                        ChequeNo: { editable: true },
                        PaymentMethod: { editable: true },
                        Edit: { editable: true }
                    }
                },
                //data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    },
};

var TallySocSearchGridHelper = {
    init: function () {
        $("#window").kendoWindow({
            width: "800px",
            title: "Confirmation",
            visible: false,
            actions: [
                "Pin",
                "Minimize",
                "Maximize",
                "Close"
            ],

        });
        TallySocSearchGridHelper.TallySocSearchGrid();

        $("#txtQuantity").kendoNumericTextBox({
            min: 1,
            format:'N0'
        });

    },

    TallySocSearchGrid: function (data) {
        $("#TallyPointSearchDiv").kendoGrid({
            dataSource: TallySocSearchGridManager.TallySocSearchDataSource(data),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            persistSelection: true,

            columns: TallySocSearchGridHelper.GenerateGridColumns(),
            editable: false,
            //toolbar: ["create"],
            //navigatable: true,
            selectable: "row,multiple"


        });
    },
    GenerateGridColumns: function () {
        return columns = [
            { field: "OrderId", hidden: true },
            { field: "DealerName", title: "Dealer Name", width: 100 },
            { field: "OrderDate", title: "Order Date", width: 90, template: "#=  kendo.toString(kendo.parseDate(OrderDate),'dd-MMM-yyyy') #" },
            { field: "Quantity", title: "Quantity", width: 80 },
            { field: "ChequeNo", title: "Cheque No", width: 90 },
            { field: "PaymentMethod", title: "Payment Method", width: 80 },
            { field: "Status", title: "Status", width: 80 },
            {
                field: "Edit", title: "Confirm", filterable: false, width: 80,
                template: '<button type="button" class="k-button k-primary" value="Confirm" id="undo" onClick="TallySocSearchGridHelper.PopUp()" >Confirm</button>', sortable: false
            }

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
   /* createQuantityObj: function () {
        var objQuantity = new Object();
        objQuantity.Quantity = $("#txtQuantity").val();

        return objQuantity;

    },*/
    PopulateQuantity: function (objQuantity) {
        var tb = $("#txtQuantity").data('kendoNumericTextBox');
        tb.value(objQuantity.Quantity);
        tb.max(objQuantity.Quantity);

    },

    PopUp: function () {
        //var entityGrid = $("#TallyPointSearchDiv").data("kendoGrid");
        //var selectedItem = entityGrid.dataItem(entityGrid.select());
        //if (selectedItem != null) {
        //    TallySocSearchGridHelper.PopulateQuantity(selectedItem);
        //}
        debugger;
        var grid = $("#TallyPointSearchDiv").data('kendoGrid');
        var item = grid.dataItem(grid.select());
        if (item != null) {
            TallySocSearchGridHelper.PopulateQuantity(item);
            _selectedMaster = item;
           // TallyConfirmationHelper.CreateTallyConfirmationObj(item);



            $("#window").data('kendoWindow').open().center();
        }
    }
}
