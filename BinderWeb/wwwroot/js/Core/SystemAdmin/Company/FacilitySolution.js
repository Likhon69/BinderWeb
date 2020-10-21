var gbFacilityArray = [];
var gbFacilitySectionArray = [];

var FacilitySolutionManager = {

    GenerateFacilitySolutionGrid: function () {
        var url = "../Facility/GetFacilitySummaryForSbuConfigaration/";
        var column = FacilitySolutionHelper.GenerateFacilitySolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridFacilitySolution", url, column, 50);
    },

    GenerateFacilitySectionMapSolutionGrid: function () {
        var url = "../Facility/GetFacilitySectionSummaryForSbuConfiguration/";
        var column = FacilitySolutionHelper.GenerateFacilitySectionMapSolColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridFacilityToSectionMapSolution", url, column, 50);
    },

    SaveFacilitySectionMap: function () {

        // if (companyDetailsHelper.validator()) {

        var objCompany = companyDetailsManager.GetDataFromCortolsAsA_Object();
        var facilityId = $("#hdnFacilitySectionId").val();
        var objCompanyInfo = JSON.stringify(objCompany).replace(/&/g, "^");

        var objFacilitySectionInfoList = JSON.stringify(gbFacilitySectionArray).replace(/&/g, "^");
        var jsonParam = "facilitySectionInfoList:" + objFacilitySectionInfoList + ",FacilityId:" + JSON.stringify(facilityId);
        var serviceUrl = "../Facility/SaveFacilitySectionMap/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        //  }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {
               // gbFacilitySectionArray = [];
                AjaxManager.MsgBox('success', 'center', 'Success', 'Facility To Section Mapping Saved Successfully.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();

                        }
                    }]);
                $("#divgridFacilityToSectionMapSolution").data("kendoGrid").dataSource.read();
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

var FacilitySolutionHelper = {

    initiateFacilitySolution: function () {

        FacilitySolutionManager.GenerateFacilitySolutionGrid();
        FacilitySolutionManager.GenerateFacilitySectionMapSolutionGrid();

        $("#btnAddFacilitySol").click(function () {
            //FacilitySolutionHelper.AddFacilitySolutionpopInfo();
            AjaxManager.PopupWindow("FacilityDiv", "Add New Facility", "80%");
        });

        $("#btnAddSectionSol").click(function () {
            //FacilitySolutionHelper.AddSectionSolutionpopInfo();
            AjaxManager.PopupWindow("SectionDiv", "Add New Section", "80%");
        });
    
        FacilitySolutionHelper.createFacilityList();
        FacilitySolutionHelper.createFacilitySectionMapList();
        FacilitySummaryhelper.initFacilitySummary();
        FacilitySummaryhelper.clickEventForEditFunction();

        SectionSummaryhelper.initSectionSummary();
        SectionSummaryhelper.clickEventForEditFunction();

        $("#txtFacilityCode").focus();
    },

    AddFacilitySolutionpopInfo: function () {
        var initPopup = $("#FacilityDiv").kendoWindow({
            title: 'Add New Facility',
            resizeable: false,
            width: "90%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: true,
        });
        initPopup.data("kendoWindow").open().center();
    },

    AddSectionSolutionpopInfo: function () {
        var initPopup = $("#SectionDiv").kendoWindow({
            title: 'Add New Facility',
            resizeable: false,
            width: "90%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: true,
        });
        initPopup.data("kendoWindow").open().center();
    },

    GenerateFacilitySolColumns: function () {
        return columns = [
            { field: "FacilityCode", title: "Facility Code", width: 100 },
            { field: "FacilityName", title: "Facility Name", width: 200 },
            { field: "FacilityId", hidden: true },
            { field: "CompanyId", hidden: true },
            { field: "Edit", title: "Action Name", filterable: false, width: 50, template: '<input type="button" class="k-button" value="Mapping to Section" id="btnEdit" onClick="FacilitySolutionHelper.clickEventForFacilitySectionMappingFunction()"/>', sortable: false }

        ];
    },

    checkedDataForFacility: function (data) {

        if (gbFacilityArray.length > 0) {

            var result = gbFacilityArray.filter(function (obj) {
                return obj.FacilityId == data.FacilityId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForFacility" class="check_rowForFacility" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForFacility" class="check_rowForFacility" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForFacility" class="check_rowForFacility" type="checkbox"/>';
        }


    },

    createFacilityList: function () {

        $('#checkAllForFacility').click('click', function (e) {

            gbFacilityArray = [];

            var gridSummary = $("#divgridFacilitySolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForFacility");
            if (selectAll.checked == true) {
                $("#divgridFacilitySolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridFacilitySolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbFacilityArray.push(obj);
                }
            }
            else {
                $("#divgridFacilitySolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridFacilitySolution table tr").removeClass('k-state-selected');
                gbFacilityArray = [];


            }
        });// All Row Selection 



        $('#divgridFacilitySolution').on('change', '.check_rowForFacility', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridFacilitySolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbFacilityArray.push(dataItem);
            } else {
                for (var i = 0; i < gbFacilityArray.length; i++) {
                    if (gbFacilityArray[i].FacilityId == dataItem.FacilityId) {
                        gbFacilityArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },

    PopulateFacilityArray: function (objFacilityList) {
        
        gbFacilityArray = [];
        for (var i = 0; i < objFacilityList.length; i++) {
            gbFacilityArray.push(objFacilityList[i]);
        }
        if (objFacilityList.length > 0) {
            $("#divgridFacilitySolution").data("kendoGrid").dataSource.read();
        }
    },

    GenerateFacilitySectionMapSolColumns: function () {
        return columns = [
            { field: "check_rowForFacilitySection", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= FacilitySolutionHelper.checkedDataForFacilitySectionMap(data) #', headerTemplate: '<input type="checkbox" id="checkAllForFacilitySection" />' },
            { field: "SectionCode", title: "Section Code", width: 100 },
            { field: "SectionName", title: "Section Name", width: 200 },
            { field: "SectionId", hidden: true }
        ];
    },
    checkedDataForFacilitySectionMap: function (data) {

        if (gbFacilitySectionArray.length > 0) {

            var result = gbFacilitySectionArray.filter(function (obj) {
                return obj.SectionId == data.SectionId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForFacilitySection" class="check_rowForFacilitySection" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForFacilitySection" class="check_rowForFacilitySection" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForFacilitySection" class="check_rowForFacilitySection" type="checkbox"/>';
        }


    },

    createFacilitySectionMapList: function () {

        $('#checkAllForFacilitySection').click('click', function (e) {

            gbFacilitySectionArray = [];

            var gridSummary = $("#divgridFacilityToSectionMapSolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForFacilitySection");
            if (selectAll.checked == true) {
                $("#divgridFacilityToSectionMapSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridFacilityToSectionMapSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbFacilitySectionArray.push(obj);
                }
            }
            else {
                $("#divgridFacilityToSectionMapSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridFacilityToSectionMapSolution table tr").removeClass('k-state-selected');
                gbFacilitySectionArray = [];


            }
        });// All Row Selection 



        $('#divgridFacilityToSectionMapSolution').on('change', '.check_rowForFacilitySection', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridFacilityToSectionMapSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbFacilitySectionArray.push(dataItem);
            } else {
                for (var i = 0; i < gbFacilitySectionArray.length; i++) {
                    if (gbFacilitySectionArray[i].SectionId == dataItem.SectionId) {
                        gbFacilitySectionArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },


    clickEventForFacilitySectionMappingFunction: function () {

        var entityGrid = $("#gridCompany").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());

        var entityGridFacility = $("#divgridFacilitySolution").data("kendoGrid");
        var selectedItemFacility = entityGridFacility.dataItem(entityGridFacility.select());

        if (selectedItem != null && selectedItemFacility != null) {
            var objFacilitySectionList = empressCommonManager.GetFacilitySectionByFacilityId(selectedItemFacility.FacilityId);
            $("#divgridFacilityToSectionMapSolution").data("kendoGrid").dataSource.data([]);
            gbFacilitySectionArray = [];
            FacilitySolutionManager.GenerateFacilitySectionMapSolutionGrid();
            FacilitySolutionHelper.PopulateFacilitySectionArray(objFacilitySectionList);
            AjaxManager.PopupWindow("divFacilityToSectionMap", "Section List", "80%");
            $("#hdnFacilitySectionId").val(selectedItemFacility.FacilityId);
        }
    },

    PopulateFacilitySectionArray: function (objFacilitySectionList) {
        gbFacilitySectionArray = [];
        for (var i = 0; i < objFacilitySectionList.length; i++) {
            gbFacilitySectionArray.push(objFacilitySectionList[i]);
        }
        if (objFacilitySectionList.length > 0) {
            $("#divgridFacilityToSectionMapSolution").data("kendoGrid").dataSource.read();
        }
    },

    closeFacilitySectionPopUp: function () {
        gbFacilitySectionArray = [];
        $("#divFacilityToSectionMap").data("kendoWindow").close();
    }

};