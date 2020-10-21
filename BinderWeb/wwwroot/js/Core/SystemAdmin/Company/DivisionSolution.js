var gbDivisionArray = [];
var gbDivisionDeptArray = [];

var DivisionSolutionManager = {

    GenerateDivisionSolutionGrid: function () {
        var url = "../Division/GetDivisionSummaryForSbuConfigaration/";
        var column = DivisionSolutionHelper.GenerateDivisionSolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridDivisionSolution", url, column, 50);
    },

    GenerateDivisionDeptMapSolutionGrid: function (companyId) {
        var url = "../Division/GetDivisionDepartmentSummaryForSbuConfigarationByCompanyId/?companyId=" + companyId;
        var column = DivisionSolutionHelper.GenerateDivisionDepartmentMapSolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridDivisionToDepartmentMapSolution", url, column, 50);
    },

    SaveDivisionDepartmentMap: function () {

        // if (companyDetailsHelper.validator()) {
      
        var objCompany = companyDetailsManager.GetDataFromCortolsAsA_Object();
        var divisionId = $("#hdnDivisionDeptId").val();
        var objCompanyInfo = JSON.stringify(objCompany).replace(/&/g, "^");

        var objDivisionDeptInfoList = JSON.stringify(gbDivisionDeptArray).replace(/&/g, "^");
        var jsonParam = "objCompanyInfo:" + objCompanyInfo + ",divisionDeptInfoList:" + objDivisionDeptInfoList + ",divisionId:" + JSON.stringify(divisionId);
        var serviceUrl = "../Division/SaveDivisionDepartmentMap/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        //  }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
               // gbDivisionDeptArray = [];
                AjaxManager.MsgBox('success', 'center', 'Success', 'Division To Department Mapping Saved Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();

                        }
                    }]);
                $("#divgridDivisionToDepartmentMapSolution").data("kendoGrid").dataSource.read();
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

var DivisionSolutionHelper = {

    initiateDivisionSolution: function () {
   
        DivisionSolutionManager.GenerateDivisionSolutionGrid();
        // DivisionSolutionManager.GenerateDivisionDeptMapSolutionGrid(0);

        $("#btnAddDivisionSol").click(function () {
           // DivisionSolutionHelper.AddDivisionSolutionpopInfo();
            AjaxManager.PopupWindow("divisionDiv", "Add New Division", "80%");
        });

        DivisionSolutionHelper.createDivisionList();
        DivisionSolutionHelper.createDivisionDepartmentMapList();
        DivisionSummaryHelper.initDivisionSummary();
        DivisionSummaryHelper.clickEventForEditDivisionFunction();
        $("#txtDivisionCode").focus();
    },

    AddDivisionSolutionpopInfo: function () {
        var initPopup = $("#divisionDiv").kendoWindow({
            title: 'Add New Division',
            resizeable: false,
            width: "90%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: true,
        });
        initPopup.data("kendoWindow").open().center();
    },

    GenerateDivisionSolColumns: function () {
        return columns = [
            { field: "check_rowForDivision", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= DivisionSolutionHelper.checkedDataForDivision(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDivision" />' },
            { field: "DivisionCode", title: "Division Code", width: 100 },
            { field: "DivisionName", title: "Division Name", width: 200 },
            { field: "DivisionId", hidden: true },
            { field: "CompanyId", hidden: true },
            { field: "Edit", title: "Action Name", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Mapping to Department" id="btnEdit" onClick="DivisionSolutionHelper.clickEventForDivisionDepartmentMappingFunction()"/>', sortable: false }

        ];
    },

    checkedDataForDivision: function (data) {

        if (gbDivisionArray.length > 0) {

            var result = gbDivisionArray.filter(function (obj) {
                return obj.DivisionId == data.DivisionId;
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

    createDivisionList: function () {

        $('#checkAllForDivision').click('click', function (e) {

            gbDivisionArray = [];

            var gridSummary = $("#divgridDivisionSolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForDivision");
            if (selectAll.checked == true) {
                $("#divgridDivisionSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridDivisionSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbDivisionArray.push(obj);
                }
            }
            else {
                $("#divgridDivisionSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridDivisionSolution table tr").removeClass('k-state-selected');
                gbDivisionArray = [];


            }
        });// All Row Selection 



        $('#divgridDivisionSolution').on('change', '.check_rowForDivision', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridDivisionSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbDivisionArray.push(dataItem);
            } else {
                for (var i = 0; i < gbDivisionArray.length; i++) {
                    if (gbDivisionArray[i].DivisionId == dataItem.DivisionId) {
                        gbDivisionArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },

    PopulateDivisionArray: function (objDivisionList) {

        gbDivisionArray = [];
        for (var i = 0; i < objDivisionList.length; i++) {
            gbDivisionArray.push(objDivisionList[i]);
        }
        if (objDivisionList.length > 0) {
            $("#divgridDivisionSolution").data("kendoGrid").dataSource.read();
        }
    },

    GenerateDivisionDepartmentMapSolColumns: function () {
        return columns = [
            { field: "check_rowForDivisionDepartment", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= DivisionSolutionHelper.checkedDataForDivisionDepartmentMap(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDivisionDepartment" onclick="DivisionSolutionHelper.createDivisionDepartmentMapList()" />' },
            { field: "DepartmentCode", title: "Department Code", width: 100 },
            { field: "DepartmentName", title: "Department Name", width: 200 },
            { field: "DepartmentId", hidden: true }
        ];
    },
    checkedDataForDivisionDepartmentMap: function (data) {
        if (gbDivisionDeptArray.length > 0) {

            var result = gbDivisionDeptArray.filter(function (obj) {
                return obj.DepartmentId == data.DepartmentId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDivisionDepartment" class="check_rowForDivisionDepartment" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDivisionDepartment" class="check_rowForDivisionDepartment" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForDivisionDepartment" class="check_rowForDivisionDepartment" type="checkbox"/>';
        }


    },

    createDivisionDepartmentMapList: function () { 
        $('#checkAllForDivisionDepartment').click('click', function (e) {
            
            gbDivisionDeptArray = [];

            var gridSummary = $("#divgridDivisionToDepartmentMapSolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForDivisionDepartment");
            if (selectAll.checked == true) {
                $("#divgridDivisionToDepartmentMapSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridDivisionToDepartmentMapSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbDivisionDeptArray.push(obj);
                }
            }
            else {
                $("#divgridDivisionToDepartmentMapSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridDivisionToDepartmentMapSolution table tr").removeClass('k-state-selected');
                gbDivisionDeptArray = [];


            }
        });// All Row Selection 



        $('#divgridDivisionToDepartmentMapSolution').on('change', '.check_rowForDivisionDepartment', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridDivisionToDepartmentMapSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbDivisionDeptArray.push(dataItem);
            } else {
                for (var i = 0; i < gbDivisionDeptArray.length; i++) {
                    if (gbDivisionDeptArray[i].DepartmentId == dataItem.DepartmentId) {
                        gbDivisionDeptArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },


    clickEventForDivisionDepartmentMappingFunction: function () {
 
        var entityGrid = $("#gridCompany").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        var entityGridDivision = $("#divgridDivisionSolution").data("kendoGrid");
        var selectedItemDiv = entityGridDivision.dataItem(entityGridDivision.select());

        if (selectedItem != null && selectedItemDiv != null) {
            var objDivisionDeptList = empressCommonManager.GetDivisionDeptByCompanyIdAndDivisionId(selectedItem.CompanyId, selectedItemDiv.DivisionId);
            $("#divgridDivisionToDepartmentMapSolution").data("kendoGrid").dataSource.data([]);
            gbDivisionDeptArray = [];
            DivisionSolutionManager.GenerateDivisionDeptMapSolutionGrid(selectedItem.CompanyId);
            DivisionSolutionHelper.PopulateDivisionDeptArray(objDivisionDeptList);
            AjaxManager.PopupWindow("divDivisionToDepartmentMap", "Department List", "80%");
            $("#hdnDivisionDeptId").val(selectedItemDiv.DivisionId);
        }
    },

    PopulateDivisionDeptArray: function (objDivisionDeptList) {
        gbDivisionDeptArray = [];
        for (var i = 0; i < objDivisionDeptList.length; i++) {
            gbDivisionDeptArray.push(objDivisionDeptList[i]);
        }
        if (objDivisionDeptList.length > 0) {
            $("#divgridDivisionToDepartmentMapSolution").data("kendoGrid").dataSource.read();
        }
    },

    closeDivisionDeptPopUp: function() {
        gbDivisionDeptArray = [];
        $("#divDivisionToDepartmentMap").data("kendoWindow").close();
    }

};