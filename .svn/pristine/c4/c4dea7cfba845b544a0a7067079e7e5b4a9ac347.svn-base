var gbFunctionListArray = [];

var accessRestrictionFunctionManager = {

    gridDataSourceForFunction: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Function/GetActiveFunctionSummary',

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

    GetFunctionInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetFunctionInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;
    }

};

var accessRestrictionFunctionHelper = {
  
    GenerateFunctionGrid: function () {
        $("#gridFunction").empty();
        var gridDataSource = accessRestrictionFunctionManager.gridDataSourceForFunction();

        $("#gridFunction").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSizes: [10, 20, 50, 100, 150, 200, 500, 1000]
            },
            filterable: true,
            sortable: true,
            columns: accessRestrictionFunctionHelper.GeneratedFunctionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedFunctionColumns: function () {
        return columns = [
         { field: "check_rowForFunction", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionFunctionHelper.checkedDataForFunction(data) #', headerTemplate: '<input type="checkbox" id="checkAllForFunction" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "Func_Id", title: "Func_Id", width: 50, hidden: true },
         { field: "Function_Name", title: "Function Name", width: 100, sortable: true }
        ];
    },

    checkedDataForFunction: function (data) {
        //debugger;
        if (gbFunctionListArray.length > 0) {

            var result = gbFunctionListArray.filter(function (obj) {
                return obj.Func_Id == data.Func_Id && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForFunction" class="check_rowForFunction" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForFunction" class="check_rowForFunction" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForFunction" class="check_rowForFunction" type="checkbox"/>';
        }
    },

    GetRowDataForFunctionGrid: function () {

        $('.check_rowForFunction').click(function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridFunction").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.Func_Id;
                    obj.ReferenceType = 5;
                    obj.Func_Id = selectedItem.Func_Id;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbFunctionListArray.push(obj);
                }
            } else {
                for (var i = 0; i < gbFunctionListArray.length; i++) {
                    var fnId = selectedItem.Func_Id;
                    if (gbFunctionListArray[i].Func_Id == fnId && gbFunctionListArray[i].ParentReference == selectedCompanyId) {
                        gbFunctionListArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForFunction').click(function (e) {
            gbFunctionListArray = [];
            var gridSummary = $("#gridFunction").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForFunction");
            if (selectAll.checked == true) {
                $("#gridFunction tbody input:checkbox").attr("checked", this.checked);
                $("#gridFunction table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.Func_Id;
                    obj.ReferenceType = 5;
                    obj.Func_Id = selectedItem.Func_Id;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbFunctionListArray.push(obj);
                }
            }
            else {
                $("#gridFunction tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridFunction table tr").removeClass('k-state-selected');
                gbFunctionListArray = $.grep(gbFunctionListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateFunctionArray: function (data) {
        //debugger;
        gbFunctionListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
          //  obj.ReferenceId = selectedItem.Func_Id;
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.Func_Id = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = 0;
            gbFunctionListArray.push(obj);
        }
    }
};