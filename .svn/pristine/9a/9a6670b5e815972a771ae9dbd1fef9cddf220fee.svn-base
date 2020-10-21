var employeeSummaryArray = [];


var dottedLineMemberSummaryManager = {
    gridDottedLineEmployeeDataSource: function () {
      //debugger;
         var objParams = commonReportParamHelper.CreateCommonReportParamObject();
        // var groupId = $("#txtGroupName").data("kendoComboBox").value();
        //if(groupId=="" || groupId==null){
        //groupId=0;
        //}
        objParams.FromDate = objParams.FromDate == null ? '01/01/0001' : objParams.FromDate;
        objParams.ToDate = objParams.ToDate == null ? '01/01/0001' : objParams.ToDate;

        objParams.RetairementDateFrom = objParams.RetairementDateFrom == "" ? '01/01/0001' : objParams.RetairementDateFrom;
        objParams.RetairementDateTo = objParams.RetairementDateTo == "" ? '01/01/0001' : objParams.RetairementDateTo;

        objParams.AgeFrom = objParams.AgeFrom == "" ? '0' : objParams.AgeFrom;
        objParams.AgeTo = objParams.AgeTo == "" ? '0' : objParams.AgeTo;
         var objCommonParam = JSON.stringify(objParams);
          //debugger;
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,
             pageSize: 20,
           
               height: 550,
               //         sortable: true,
               //         scrollable: {
               //             endless: true
               //         },
               //         pageable: {
               //             numeric: false,
               //             previousNext: false
               //         },

            transport: {
                read: {
                    url: '../DottedLineGroupConfig/GetDottedLineEmployeeList/?param=' + JSON.stringify(objParams) ,
 
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
};

var dottedLineMemberSummaryHelper = {

    GenerateDottedLineMemberSummaryGrid: function () {
        
        $("#gvEmployeeDetails").kendoGrid({
            dataSource: dottedLineMemberSummaryManager.gridDottedLineEmployeeDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
              
            },
            filterable: true,
            sortable: true,
            columns: dottedLineMemberSummaryHelper.GenerateDottedLineEmployeeColumns(),
            editable: false,
            //Toolbar: ["create"],
           // navigatable: true,
            selectable: "multiple",
           
          
            //selectable: false

        });
    },
        GenerateDottedLineEmployeeColumns: function () {
        return columns = [
          { field: "check_rowForEmployee", title: "Select", width: 25, filterable: false, sortable: false, template: '#= dottedLineMemberSummaryHelper.checkedData(data) #', headerTemplate: '<input type="checkbox" id="check_AllrowForEmployee" />' },
          { filed: "HRRecordId", title: "HrRecordId", width: 50, hidden: true },

          { field: "EmployeeId", title: "Employee Code", width: 150, sortable: false },
           { field: "FullName", title: "Employee Name", width: 350, sortable: false },


        ];
    },

     checkedData: function (data) {
        
        if (employeeSummaryArray.length > 0) {

            var result = employeeSummaryArray.filter(function (obj) {
                return obj.HRRecordId == data.HRRecordId;
            });
            if (result.length > 0) {
                return '<input id="check_rowForEmployee" class="check_rowForEmployee" type="checkbox" checked="checked"/>';
            }
            else {
                return '<input id="check_rowForEmployee" class="check_rowForEmployee" type="checkbox"/>';
            }

        }
        else {
            return '<input id="check_rowForEmployee" class="check_rowForEmployee" type="checkbox"/>';
        }
    },

    GeRowDataForEmployeeGrid: function () {
        
        $(document).on("click",'.check_rowForEmployee',function (e) {
            //debugger;
            var $cb = $(this);
            var gridSummary = $("#gvEmployeeDetails").data("kendoGrid");
            var selectedItem = gridSummary.dataItem(gridSummary.select());
            if ($cb.is(':checked')) {
                if (selectedItem != null) {
                    var res = $.grep(employeeSummaryArray, function (n) {
                        return n.HRRecordId == selectedItem.HRRecordId;

                    });
                    if (res.length == 0) {
                        var oDiv = new Object();
                        oDiv.HRRecordId = selectedItem.HRRecordId;
                        employeeSummaryArray.push(oDiv);
                    }
                } else {
                    $cb.removeProp('checked', false);
                }
            } else {
                employeeSummaryArray = $.grep(employeeSummaryArray, function (n) {
                    //return n.HRRecordId != selectedItem.HRRecordId;
                      employeeSummaryArray = [];

                });

            }
            gridSummary.clearSelection();
            
           
            //alert(employeeSummaryArray.length);
            
        });

        $(document).on("click", '#check_AllrowForEmployee', function (e) {
            employeeSummaryArray = [];
            var gridSummary = $("#gvEmployeeDetails").data("kendoGrid");
            var selectAll = document.getElementById("check_AllrowForEmployee");
            if (selectAll.checked == true) {
                $("#gvEmployeeDetails tbody input:checkbox").attr("checked", this.checked);
                $("#gvEmployeeDetails table tr").addClass('k-state-selected');
                var gridData = gridSummary.dataSource.data();
                for (var i = 0; i < gridData.length; i++) {
                    var emp = gridData[i];
                    var oDiv = new Object();
                    oDiv.HRRecordId = emp.HRRecordId;
                    employeeSummaryArray.push(oDiv);
                }
            }
            else {
                $("#gvEmployeeDetails tbody input:checkbox").removeAttr("checked", this.checked);
                $("#gvEmployeeDetails table tr").removeClass('k-state-selected');
                employeeSummaryArray = [];

            }
            gridSummary.clearSelection();
            // alert(employeeSummaryArray.length);
        });
        
    },
    ClearGrid: function(){

        employeeSummaryArray = [];
    
        }

};