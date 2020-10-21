var gbDepartmentListArray = [];
var AccessRestrictionDepartmentManager = {
    
    gridDataSourceForDepartment: function (companyId) {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Department/GetActiveDepartmentGridDataByCompanyId/?companyId=' + companyId,

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
    
    GetDepartmentInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetDepartmentInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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

var AccessRestrictionDepartmentHelper = {
    
    GenerateDepartmentGrid: function (companyId) {
        $("#gridDeprtment").empty();
        var gridDataSource = AccessRestrictionDepartmentManager.gridDataSourceForDepartment(companyId);

        $("#gridDeprtment").kendoGrid({
            dataSource: gridDataSource,
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                pageSizes: [10, 20, 50, 100, 150, 200, 500, 1000]
            },
            xheight: 250,
            filterable: true,
            sortable: true,
            columns: AccessRestrictionDepartmentHelper.GeneratedDepartmentColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedDepartmentColumns: function () {
        return columns = [
         { field: "check_rowForDepartment", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= AccessRestrictionDepartmentHelper.checkedDataForDepartment(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDepartment" />' },//headerTemplate: '<input type="checkbox" id="checkAll" />s
         { field: "DepartmentId", title: "DepartmentId", width: 50, hidden: true },
         { field: "DepartmentName", title: "Department Name", width: 100, sortable: true }
        ];
    },

    checkedDataForDepartment: function (data) {
        if (gbDepartmentListArray.length > 0) {
            
            var result = gbDepartmentListArray.filter(function (obj) {
                return obj.DepartmentId == data.DepartmentId && obj.ChiledParentReference == selectedBranchId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDepartment" class="check_rowForDepartment" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDepartment" class="check_rowForDepartment" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForDepartment" class="check_rowForDepartment" type="checkbox"/>';
        }
    },

    GetRowDataForDepartmentGrid: function () {
        
        $('.check_rowForDepartment').click(function (e) {
            //debugger;
            var $cb = $(this);
            var gridSummary = $("#gridDeprtment").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.DepartmentId;
                    obj.ReferenceType = 3;
                    obj.DepartmentId = selectedItem.DepartmentId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = selectedBranchId;
                    gbDepartmentListArray.push(obj);
                }
            } else {
                gbDepartmentListArray = $.grep(gbDepartmentListArray, function (n) {
                    return n.DepartmentId != selectedItem.DepartmentId;

                });

            }

            
        });

        $('#checkAllForDepartment').click(function (e) {
          //  gbDepartmentListArray = [];
            var gridSummary = $("#gridDeprtment").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForDepartment");
            if (selectAll.checked == true) {
                $("#gridDeprtment tbody input:checkbox").attr("checked", this.checked);
                $("#gridDeprtment table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.DepartmentId;
                    obj.ReferenceType = 3;
                    obj.DepartmentId = selectedItem.DepartmentId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = selectedBranchId;

                    gbDepartmentListArray.push(obj);
                }
            }
            else {
                $("#gridDeprtment tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridDeprtment table tr").removeClass('k-state-selected');
                gbDepartmentListArray = [];

            }

            
        });

    },
    
    PopulateDepartmentArray: function (data) {
        gbDepartmentListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.DepartmentId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = selectedItem.ChiledParentReference;
            gbDepartmentListArray.push(obj);
        }
    }
};