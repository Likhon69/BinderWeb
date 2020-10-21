
var BranchTypeChargeSummaryManager = {


    SaveBranchTypeCharge: function () {


        var obj = BranchTypeChargeSummaryHelper.createBranchTypeCharge();
        var objinfo = JSON.stringify(obj);
        var jsonParam = 'objBranchTypeForBranchMapping:' + objinfo;
        var serviceUrl = "../BranchTypeWithBranchMapping/SaveBranchTypeCharge";
        AjaxManager.SendJson2(serviceUrl, jsonParam, function (jsonData) {
            if (jsonData == "Success") {
                Message.Success('BranchType Add/Modify Successfully');
                $("#divBranchTypeChargeGrid").data("kendoGrid").dataSource.read();
            } else {
                Message.Warning(jsonData);
            }
        }, function (error) {
            Message.Warning(error.statusText);
        });
    },
    deleteBranchTypeChargeDataSource: function (branchTypeId) {
        
        var jsonParam = 'objBranchTypeForBranchMapping:' + branchTypeId;
        var serviceUrl = "../BranchTypeWithBranchMapping/DeleteSaveBranchTypeAllowance";
        AjaxManager.SendJson2(serviceUrl, jsonParam, function (jsonData) {
            if (jsonData == "Success") {
                Message.Success('BranchType Delete Successfully');
                $("#divBranchTypeChargeGrid").data("kendoGrid").dataSource.read();
            } else {
                Message.Warning(jsonData);
            }
        }, function (error) {
            Message.Warning(error.statusText);
        });

    },

    BranchTypeChargeDataSource: function () {
       
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            batch: true,
            //autoSync: true,
            
            transport: {read: {
                    url: '../BranchTypeWithBranchMapping/GetBranchTypeChargeSummary',
                    type: "POST",
                    dataType: "json",
                    cache: false,
                    async: false,
                    contentType: "application/json; charset=utf-8"},
                     parameterMap: function (options, operation) {
                    if (operation !== "read" && options.models) {
                        return { models: kendo.stringify(options.models) };
                    }
                    return JSON.stringify(options);
                }
            },

            schema: {
                model: {
                    id: "BranchTypeId",
                    fields: {
                        BranchTypeId:{type:'number'},
                        BranchType: {type:'text', editable: true },
                        Allowance: { type: 'number', editable: true },
                    },
                  
                },
                data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    }

};

var BranchTypeChargeSummaryHelper = {
    
    GenerateBranchTypeChargeGrid: function () {
        
        $("#divBranchTypeChargeGrid").kendoGrid({
            dataSource: BranchTypeChargeSummaryManager.BranchTypeChargeDataSource(),
            pageable: {
                refresh: true,serverPaging: true,serverFiltering: true,serverSorting: true
            },
            filterable: true, sortable: true,
            columns: BranchTypeChargeSummaryHelper.GenerateBranchTypeChargeGridColumns(),
            editable: true,
            toolbar: ["create"], selectable: "row,multiple",
            dataBound: function (e) {

            }

        });
    },


    GenerateBranchTypeChargeGridColumns: function () {
        return columns = [
            
            { field: "BranchType", title: "Branch Type", width: 100 },
            { field: "Allowance", title: "Allowance", width: 100 },

           {
               field: "Delete", title: "Delete", filterable: false, width: 50, template:
                  '<button type="button" value="Delete" id="btnDelete" class="k-button" onClick="BranchTypeChargeSummaryHelper.deleteBranchTypeCharge()"><span class="k-icon k-i-pencil">Delete</span></button>', sortable: false
            }
            
           
        ];   

    },
    deleteBranchTypeCharge: function () {
        var entityGrid = $("#divBranchTypeChargeGrid").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        BranchTypeChargeSummaryManager.deleteBranchTypeChargeDataSource(selectedItem.BranchTypeId);
    },

    createBranchTypeCharge: function () {

        var obj = new Object();

        var branchTypeChargeInfo = $("#divBranchTypeChargeGrid").data('kendoGrid').dataSource.data();
        return branchTypeChargeInfo;

    },

};