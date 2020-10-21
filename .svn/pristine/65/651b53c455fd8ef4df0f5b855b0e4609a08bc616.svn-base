var gbGradeListArray = [];

var accessRestrictionGradeManager = {

    gridDataSourceForGrade: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 1000,

            transport: {
                read: {
                    url: '../Grade/GetGradeSummaryDataSource',

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

    GetGradeInformation: function (hrRecordId, restrictionId) {
        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../AccessRestriction/GetGradeInformationByHrRecordId/?hrRecordId=" + hrRecordId + "&restrictionId=" + restrictionId;
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

var accessRestrictionGradeHelper = {

    GenerateGradeGrid: function () {
        $("#gridGrade").empty();
        var gridDataSource = accessRestrictionGradeManager.gridDataSourceForGrade();

        $("#gridGrade").kendoGrid({
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
            columns: accessRestrictionGradeHelper.GeneratedGradeColumns(),
            editable: false,
            navigatable: true,
            selectable: "row"

            //selectable: false

        });

    },

    GeneratedGradeColumns: function () {
        return columns = [
         { field: "check_rowForGrade", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= accessRestrictionGradeHelper.checkedDataForGrade(data) #', headerTemplate: '<input type="checkbox" id="checkAllForGrade" />' },
          { field: "GradeId", title: "GradeId", width: 50, hidden: true },
         { field: "GradeName", title: "Grade Name", width: 100, sortable: true },
        ];
    },

    checkedDataForGrade: function (data) {
        
        if (gbGradeListArray.length > 0) {

            var result = gbGradeListArray.filter(function (obj) {
                return obj.GradeId == data.GradeId && obj.ParentReference == selectedCompanyId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForGrade" class="check_rowForGrade" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForGrade" class="check_rowForGrade" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForGrade" class="check_rowForGrade" type="checkbox"/>';
        }
    },

    GetRowDataForGradeGrid: function () {

        $(document).on("click",'.check_rowForGrade',function (e) {

            var $cb = $(this);
            var gridSummary = $("#gridGrade").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());//$kgrid.attr('k-state-selected');
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.GradeId;
                    obj.ReferenceType = 10;
                    obj.GradeId = selectedItem.GradeId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;
                    gbGradeListArray.push(obj);
                }
            } else {
                for (var i = 0; i < gbGradeListArray.length; i++) {
                    var grId = selectedItem.GradeId;
                    if (gbGradeListArray[i].GradeId == grId && gbGradeListArray[i].ParentReference == selectedCompanyId) {
                        gbGradeListArray.splice(i, 1);
                        break;
                    }
                }

            }


        });

        $('#checkAllForGrade').click(function (e) {
            gbGradeListArray = [];
            var gridSummary = $("#gridGrade").data("kendoGrid");
            var selectAll = document.getElementById("checkAllForGrade");
            if (selectAll.checked == true) {
                $("#gridGrade tbody input:checkbox").attr("checked", this.checked);
                $("#gridGrade table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var selectedItem = gridData[i];
                    var obj = new Object();
                    obj.ReferenceId = selectedItem.GradeId;
                    obj.ReferenceType = 10;
                    obj.GradeId = selectedItem.GradeId;
                    obj.ParentReference = selectedCompanyId;
                    obj.ChiledParentReference = 0;

                    gbGradeListArray.push(obj);
                }
            }
            else {
                $("#gridGrade tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gridGrade table tr").removeClass('k-state-selected');
                gbGradeListArray = $.grep(gbFunctionListArray, function (n) {
                    return n.ParentReference != selectedCompanyId;

                });

            }


        });

    },

    PopulateGradeArray: function (data) {
        
        gbGradeListArray = [];
        for (var i = 0; i < data.length; i++) {
            var selectedItem = data[i];
            var obj = new Object();
            //  obj.ReferenceId = selectedItem.Func_Id;
            obj.ReferenceId = selectedItem.ReferenceId;
            obj.ReferenceType = selectedItem.ReferenceType;
            obj.GradeId = selectedItem.ReferenceId;
            obj.ParentReference = selectedItem.ParentReference;
            obj.ChiledParentReference = 0;
            gbGradeListArray.push(obj);
        }
    }
};