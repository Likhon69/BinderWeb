var gbDesignationArray = [];
var designationSolutionManager = {
    
    GenerateDesignationSolutionGrid: function () {
        var url = "../Designation/GetActiveDesignationSummaryForSbuConfigaration/";
        var column = designationSolutionHelper.GeneratedDesignationColumns();
        empressCommonManager.GenerateCommonGridWithPaging("divgridDesignationSolution", url, column, 50);
    }
    
};

var designationSolutionHelper = {
    
    initiateDesignationSolution: function() {
        $("#txtSortOrder").kendoNumericTextBox({
            format: "#",
            min: 0,
            max: 500
        }).parent().parent().css('width', "17.4em");
        designationSolutionManager.GenerateDesignationSolutionGrid();
        $("#btnAddNewDesignation").click(function () {
            designationSolutionHelper.AddDesignationSolutionpopInfo();

        });
        designationSolutionHelper.createDesignationList();
        designationSummaryManager.GenerateDesignationGridSummary();
        designationSummaryHelper.clickEventForEditButton();
        $("#txtDesignationCode").focus();
        empressCommonHelper.GenerateDesignationAllCombo("cmbParentDesignationName");
      //  empressCommonHelper.populateGradeType("cmbDesigType");
    },
    
    GeneratedDesignationColumns: function () {
        return columns = [
        { field: "check_rowForDesignation", title: "Select", width: 35, editable: false, filterable: false, sortable: false, template: '#= designationSolutionHelper.checkedDataForDesignation(data) #', headerTemplate: '<input type="checkbox" id="checkAllForDesignation" />' },
        { filed: "DesignationId", title: "DesignationId", width: 50, hidden: true },
        { field: "DesignationCode", title: "Designation Code", width: 120, sortable: true },
        { field: "DesignationName", title: "Designation Name", width: 200, sortable: true },
        { field: "DSortOrder", title: "Sequence", width: 100, sortable: true }
        ];
    },
    
    checkedDataForDesignation: function (data) {

        if (gbDesignationArray.length > 0) {

            var result = gbDesignationArray.filter(function (obj) {
                return obj.DesignationId == data.DesignationId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForDesignation" class="check_rowForDesignation" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForDesignation" class="check_rowForDesignation" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForDesignation" class="check_rowForDesignation" type="checkbox"/>';
        }


    },
    
    createDesignationList: function () {

        $('#checkAllForDesignation').click('click', function (e) {

            gbDesignationArray = [];

            var gridSummary = $("#divgridDesignationSolution").data("kendoGrid");

            var selectAll = document.getElementById("checkAllForDesignation");
            if (selectAll.checked == true) {
                $("#divgridDesignationSolution tbody input:checkbox").attr("checked", this.checked);
                $("#divgridDesignationSolution table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var obj = gridData[i];
                    gbDesignationArray.push(obj);
                }
            }
            else {
                $("#divgridDesignationSolution tbody input:checkbox").removeAttr("checked", this.checked);
                $("#divgridDesignationSolution table tr").removeClass('k-state-selected');
                gbDesignationArray = [];
            }
        });// All Row Selection 

        $('#divgridDesignationSolution').on('change', '.check_rowForDesignation', function (e) {

            var $target = $(e.currentTarget);
            var grid = $("#divgridDesignationSolution").data("kendoGrid");
            var dataItem = grid.dataItem($(this).closest('tr'));
            if ($target.prop("checked")) {
                gbDesignationArray.push(dataItem);
            } else {
                for (var i = 0; i < gbDesignationArray.length; i++) {
                    if (gbDesignationArray[i].DesignationId == dataItem.DesignationId) {
                        gbDesignationArray.splice(i, 1);
                        break;
                    }
                }

            }
        });


    },
    
    AddDesignationSolutionpopInfo: function() {
        
        var initPopup = $("#designationDiv").kendoWindow({
            title: 'Add New Designation',
            resizeable: false,
            width: "95%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
        initPopup.data("kendoWindow").open().center();
    },
    
    PopulateDessignationArray: function(objDesignationList) {
        gbDesignationArray = [];
        for (var i = 0; i < objDesignationList.length; i++) {
            gbDesignationArray.push(objDesignationList[i]);
        }
        if (objDesignationList.length > 0) {
            $("#divgridDesignationSolution").data("kendoGrid").dataSource.read();
        }
    }
    
};