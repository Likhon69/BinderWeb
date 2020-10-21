
var gbDivisionListArray = [];

var accessRestrictionDivisionManager = {
    
    gridDataSourceForDivision: function (companyId) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Division/GetActivDivisionGridDataByCompanyId/?companyId=' + companyId,

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

    GetDivisionInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetDivisionInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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

var accessRestrictionDivisionHelper = {
    
    GenerateDivisionGrid: function (companyId) {
        $("#gridDivision").empty();
        var gridDataSource = accessRestrictionDivisionManager.gridDataSourceForDivision(companyId);

        $("#gridDivision").kendoGrid({
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
            columns: accessRestrictionDivisionHelper.GeneratedDivisionColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedDivisionColumns: function () {
        return columns = [
         { field: "check_rowForDivision", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionDivisionHelper.checkedDataForDivision(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDivision" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "DivisionId", title: "DivisionId", width: 50, hidden: true },
         { field: "DivisionName", title: "Division Name", width: 100, sortable: true }
        ];
    },

    checkedDataForDivision: function (data) {
        //debugger;
        if (gbDivisionListArray.length > 0) {

            var result = gbDivisionListArray.filter(function (obj) {
                return obj.DivisionId == data.DivisionId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDivision" class="check_rowForDivision" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDivision" class="check_rowForDivision" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForDivision" class="check_rowForDivision" type="checkbox"/>';
        }
    },

    GetRowDataForDivisionGrid: function () {

        $('.check_rowForDivision').click(function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridDivision").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.DivisionId;
                    obj.ReferenceType = 4;
                    obj.DivisionId = selectedItem.DivisionId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbDivisionListArray.push(obj);
                }
            } else {
               
                for (var i = 0; i < gbDivisionListArray.length; i++) {
                    var divId = selectedItem.DivisionId;
                    if (gbDivisionListArray[i].DivisionId == divId && gbDivisionListArray[i].ParentReference == selectedCompanyId) {
                        gbDivisionListArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForDivision').click(function (e) {
            gbDepartmentListArray = [];
            var gridSummary = $("#gridDivision").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForDivision");
            if (selectAll.checked == true) {
                $("#gridDivision tbody input:checkbox").attr("checked", this.checked);
                $("#gridDivision table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.DivisionId;
                    obj.ReferenceType = 4;
                    obj.DivisionId = selectedItem.DivisionId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbDivisionListArray.push(obj);
                }
            }
            else {
                $("#gridDivision tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridDivision table tr").removeClass('k-state-selected');
                gbDivisionListArray = $.grep(gbDivisionListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateDivisionArray: function (data) {
        gbDivisionListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.DivisionId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = selectedItem.ChiledParentReference;
            gbDivisionListArray.push(obj);
        }
    }
};