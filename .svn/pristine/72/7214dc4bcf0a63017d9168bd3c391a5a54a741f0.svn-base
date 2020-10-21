
var BranchTypeWithBranchMappingSummaryManager = {


    BranchTypeWithBranchMappingDataSource: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            //pageSize: 10,
            batch: true,
            //autoSync: true,

            transport: {
                read: {
                    url: '../BranchTypeWithBranchMapping/GetBranchTypeWithBranchMappingSummary',
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    async: false,
                    contentType: "application/json; charset=utf-8"
                },
                parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                    return JSON.stringify(options);
                }
            },

            schema: {
                model: {
                    id: "BranchTypeMappingId",
                    fields: {
                        BranchTypeMappingId: { type: 'number' },
                        BranchName: { type: 'text', editable: true },
                        BranchType: { type: 'text', editable: true }
                        
                    },

                },
                data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    }

};

var BranchTypeWithBranchMappingSummaryHelper = {

    GenerateBranchTypeWithBranchMappingGrid: function () {
        
        //$("#divBranchTypeWithBranchMappingSummary").kendoGrid({
        //    dataSource: BranchTypeWithBranchMappingSummaryManager.BranchTypeWithBranchMappingDataSource(),
        //    pageable: {
        //        refresh: true, serverPaging: true, serverFiltering: true, serverSorting: true
        //    },
        //    filterable: true, sortable: true,
        //    columns: BranchTypeWithBranchMappingSummaryHelper.GenerateBranchTypeWithBranchMappingGridColumns(),
        //    editable: false,
        //    //toolbar: ["create"], selectable: "row,multiple",
        //    dataBound: function (e) {

        //    }

        //});

        $("#divBranchTypeWithBranchMappingSummary").kendoGrid({
            dataSource: BranchTypeWithBranchMappingSummaryManager.BranchTypeWithBranchMappingDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: BranchTypeWithBranchMappingSummaryHelper.GenerateBranchTypeWithBranchMappingGridColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"
        });
    },


    GenerateBranchTypeWithBranchMappingGridColumns: function () {
        return columns = [
             { field: "BranchName", title: "Branch Name", width: 100 },
            { field: "BranchType", title: "Branch Type", width: 100 },
            {
                field: "Edit", title: "Edit", filterable: false, width: 30, template:
                  '<button type="button" value="Edit" id="btnEdit" class="k-button" onClick="BranchTypeWithBranchMappingSummaryHelper.clickEventForEditFunction()"><span class="k-icon k-i-pencil"></span></button>', sortable: false
            },
           


        ];

    },

    populateBranchTypeWithBranchMappingInformation: function (objMapping) {


         $("#hdnBranchMappingId").val(objMapping.BranchTypeMappingId);
          $("#txtBranchType").data("kendoComboBox").value(objMapping.BranchType);
          $("#txtBranchName").data("kendoComboBox").value(objMapping.BranchId);

    },

    clickEventForEditFunction: function () {
       

        var gridData = $("#divBranchTypeWithBranchMappingSummary").data("kendoGrid");
        var selectedItem = gridData.dataItem(gridData.select());
        
        if (selectedItem != null) {
            BranchTypeWithBranchMappingSummaryHelper.populateBranchTypeWithBranchMappingInformation(selectedItem);
    }

}


   

    

};