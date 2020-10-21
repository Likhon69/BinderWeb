var BranchTypeWiseManPowerSetupSummaryManager = {


    SaveBranchTypeWiseManPowerSetup: function () {


        var obj = BranchTypeWiseManPowerSetupSummaryHelper.createManPowerSetupInfo();
        var objinfo = JSON.stringify(obj);
        var jsonParam = 'objManPowerSetup:' + objinfo;
        var serviceUrl = "../ManPowerSetup/SaveManOfPowerSetup";
        AjaxManager.SendJson2(serviceUrl, jsonParam, function (jsonData) {
            if (jsonData == "Success") {
                Message.Success('Update Successfully');
                $("#divBranchTypeWiseManPowerSetupSummary").data("kendoGrid").dataSource.read();
            } else {
                Message.Warning(jsonData);
            }
        }, function (error) {
            Message.Warning(error.statusText);
        });
    },


    ManPowerSetupDataSource: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            allowUnsort: true,
            pageSize: 10,
            batch: true,
            //autoSync: true,

            transport: {
                read: {
                    url: '../ManPowerSetup/GetManPowerSetupInfo',
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
                    id: "ManPowerSetupId",
                    fields: {
                        ManPowerSetupId: { type: 'number' },
                        BranchType: { type: 'text', editable: false },
                        ManPowerForCash: { type: 'number', editable: true },
                        ManPowerForNonCash: { type: 'number', editable: true }
                    },

                },
                data: "Items", total: "TotalCount"
            }
        });
        return gridDataSource;
    }

};

var BranchTypeWiseManPowerSetupSummaryHelper = {

    GenerateBranchTypeChargeGrid: function () {

        $("#divBranchTypeWiseManPowerSetupSummary").kendoGrid({
            dataSource: BranchTypeWiseManPowerSetupSummaryManager.ManPowerSetupDataSource(),
            pageable: {
                refresh: true, serverPaging: true, serverFiltering: true, serverSorting: true
            },
            filterable: true, sortable: true,
            columns: BranchTypeWiseManPowerSetupSummaryHelper.GenerateManPowerSetupInfoGridColumns(),
            editable: true,
            //toolbar: ["create"], selectable: "row,multiple",
            dataBound: function (e) {

            }

        });
    },


    GenerateManPowerSetupInfoGridColumns: function () {

        var obj = new Object();

        if (assembly.AssemblyInfoId == 19) {
            obj = [
           { field: "BranchType", title: "Branch Type", width: 100 },
           { field: "ManPowerForCash", title: "Executive", width: 100 },
           { field: "ManPowerForNonCash", title: "Officer", width: 100 }

            ];
        }
        else {
            obj = [
            { field: "BranchType", title: "Branch Type", width: 100 },
            { field: "ManPowerForCash", title: "Man Power For Cash", width: 100 },
            { field: "ManPowerForNonCash", title: "Man Power For Non-Cash", width: 100 }

            ];
        };

       
        return obj;
    },

    createManPowerSetupInfo: function () {

        var obj = new Object();

        var manPowerSetupInfo = $("#divBranchTypeWiseManPowerSetupSummary").data('kendoGrid').dataSource.data();
        return manPowerSetupInfo;

    }

};