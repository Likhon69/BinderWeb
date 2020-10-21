﻿$(document).ready(function () {


    LocationGridHelper.GenerateLocationGrid();
});
var items = "";
var selectedItems = [];
var LocationGridManager = {
    gridDataSource: function () {


        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,
            batch: true,
            pageSize: 5,

            transport: {
                read: {
                    url: binderApi + '/Dealer/GetLocationList/?access_token=' + sessionStorage.getItem("token"),

                    type: "POST",


                    dataType: "json",

                    contentType: "application/json; charset=utf-8"
                },

                parameterMap: function (options) {

                    return JSON.stringify(options);

                }
            },
            schema: {
                model: {
                    id: "Branchid"

                },
                data: "Items", total: "TotalCount"
            },
            //schema: { id: "Branchid", data: "Items", total: "TotalCount" }
        });
        return gridDataSource;
    },
    SetSelectedItems: function (dealerId) {
        selectedItems = AjaxManager.GetDataSource(binderApi + '/Dealer/GetDealerLocationMapping', 'dealerId=' + dealerId);
        LocationGridHelper.GenerateLocationGrid(dealerId);

        //  $("#LocationSummaryDiv").data('kendoGrid').dataSource.read();
    }

};
var LocationGridHelper = {

    GenerateLocationGrid: function (dealerId) {
        debugger;
        $("#LocationSummaryDiv").kendoGrid({
            dataSource: LocationGridManager.gridDataSource(dealerId),
            pageable: false,
            xheight: 450,
            filterable: false,
            sortable: false,
            persistSelection: true,
            columns: LocationGridHelper.GeneratedLocationGridColumns(),
            editable: false,
            navigatable: true,
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
            dataBound: onDataBound,
        });

        function onDataBound(e) {
            var grid = this;
            var rows = grid.items();

            $(rows).each(function (e) {
                var row = this;
                debugger;
                var dataItem = grid.dataItem(row);
                var queryResult2 = Enumerable.From(selectedItems)
                    .Where(function (x) { return x.LocationId == dataItem.Branchid })
                    .ToArray();
                if (queryResult2 != null && queryResult2.length==1) {
                    if (dataItem.Branchid == queryResult2[0].LocationId) {
                        grid.select(row);
                    }
                }


            });
        }
    },
    GeneratedLocationGridColumns: function () {
        return columns = [
            { selectable: true, width: 15 },

            { field: "Branchcode", title: "Location Code", width: 30 },
            { field: "Branchname", title: "Location Name", width: 50, sortable: false },
            //{ field: "PricingDate", title: "Pricing Date", width: 150, template: "#=  kendo.toString(kendo.parseDate(PricingDate),'dd-MMM-yyyy') #" },


            //{ field: "IsActive", title: "Status", width: 50, sortable: false, template: "#=IsActive==1?'Active':'In Active'#" },


        ];
    }
}