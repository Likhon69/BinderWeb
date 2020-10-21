
var gbDepartmentSectionArray = [];

var SectionSolutionManager = {
    GenerateDeptSectionMapSolutionGrid: function () {
        var url = "../Section/GetDeptSectionSummaryForSbuConfiguration/";
        var column = SectionSolutionHelper.GenerateDeptSectionMapSolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridDeptToSectionMapSolution", url, column, 50);
    },

    SaveDepartmentSectionMap: function () {

        // if (companyDetailsHelper.validator()) {
        //debugger;
        var objCompany = companyDetailsManager.GetDataFromCortolsAsA_Object();
        var departmentId = $("#hdnDepartmentSectionId").val();
        var objCompanyInfo = JSON.stringify(objCompany).replace(/&/g, "^");

        var objDeptSectionInfoList = JSON.stringify(gbDepartmentSectionArray).replace(/&/g, "^");
        var jsonParam = "deptSectionInfoList:" + objDeptSectionInfoList + ",departmentId:" + JSON.stringify(departmentId) + ",objCompanyInfo:" + objCompanyInfo;
        var serviceUrl = "../Section/SaveDepartmentSectionMap/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        //  }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
                // gbDepartmentFacilityArray = [];
                AjaxManager.MsgBox('success', 'center', 'Success', 'Dept to Section Mapping Saved Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();

                        }
                    }]);
                $("#divgridDeptToSectionMapSolution").data("kendoGrid").dataSource.read();
            }

            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                       [{
                           addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                               $noty.close();
                           }
                       }]);
            }
        }

        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

};

var SectionSolutionHelper = {
    initSectionSolution: function() {

        //$("#btnAddDeptSectionSol").click(function () {
        //    AjaxManager.PopupWindow("deptSectionDiv", "Add New Section", "80%");
        //});
    },

    clickEventForDeptSectionMappingFunction: function () {
        //debugger;
        var entityGrid = $("#gridCompany").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        var entityGridDept = $("#divgridDepartmentSolution").data("kendoGrid");
        var selectedItemDept = entityGridDept.dataItem(entityGridDept.select());

        if (selectedItem != null && selectedItemDept != null) {
            var objDeptSectionList = empressCommonManager.GetDepartmentSectionByDepartmentId(selectedItemDept.DepartmentId, selectedItem.CompanyId);
            $("#divgridDeptToSectionMapSolution").data("kendoGrid").dataSource.data([]);
            gbDepartmentSectionArray = [];
            SectionSolutionManager.GenerateDeptSectionMapSolutionGrid();
            SectionSolutionHelper.PopulateDeptSectionArray(objDeptSectionList);
            AjaxManager.PopupWindow("divDepartmentToSectionMap", "Section List", "80%");
            $("#hdnDepartmentSectionId").val(selectedItemDept.DepartmentId);
        }
    },

    PopulateDeptSectionArray: function (objDeptSectionList) {
        gbDepartmentSectionArray = [];
        for (var i = 0; i < objDeptSectionList.length; i++) {
            gbDepartmentSectionArray.push(objDeptSectionList[i]);
        }
        if (objDeptSectionList.length > 0) {
            $("#divgridDeptToSectionMapSolution").data("kendoGrid").dataSource.read();
        }
    },

    GenerateDeptSectionMapSolColumns: function () {
        return columns = [
            { field: "check_rowForDeptSection", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= SectionSolutionHelper.checkedDataForDeptSectionMap(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDeptSection" />' },
            { field: "SectionCode", title: "Section Code", width: 100 },
            { field: "SectionName", title: "Section Name", width: 200 },
            { field: "SectionId", hidden: true }
        ];
    },

    checkedDataForDeptSectionMap: function (data) {

        if (gbDepartmentSectionArray.length > 0) {

            var result = gbDepartmentSectionArray.filter(function (obj) {
                return obj.SectionId == data.SectionId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDeptSection" class="check_rowForDeptSection" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDeptSection" class="check_rowForDeptSection" type="checkbox"/>';
            }
        }
        else {
            return '<input id="check_rowForDeptSection" class="check_rowForDeptSection" type="checkbox"/>';
        }
    },



    createDeptSectionMapList: function () {

        $('#checkAllForDeptSection').click('click', function (e) {

            gbDepartmentSectionArray = [];

            var gridSummary = $("#divgridDeptToSectionMapSolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForDeptSection");
            if (selectAll.checked == true) {
                $("#divgridDeptToSectionMapSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridDeptToSectionMapSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbDepartmentSectionArray.push(obj);
                }
            }
            else {
                $("#divgridDeptToSectionMapSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridDeptToSectionMapSolution table tr").removeClass('k-state-selected');
                gbDepartmentSectionArray = [];


            }
        });// All Row Selection 



        $('#divgridDeptToSectionMapSolution').on('change', '.check_rowForDeptSection', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridDeptToSectionMapSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbDepartmentSectionArray.push(dataItem);
            } else {
                for (var i = 0; i < gbDepartmentSectionArray.length; i++) {
                    if (gbDepartmentSectionArray[i].SectionId == dataItem.SectionId) {
                        gbDepartmentSectionArray.splice(i, 1);
                        break;
                    }
                }

            }
        });

    },

    closeDeptSectionPopUp: function () {
        gbDepartmentSectionArray = [];
        $("#divDepartmentToSectionMap").data("kendoWindow").close();
    }
};