
var total = 0; var ok = 0; var notFound = 0; var notSelected = 0; var kpiError = 0;
$(document).ready(function () {

    UserIdChangeHelper.InitializeUpload();
   
    $("#btnSaveUserIdChangeData").click(function () {
        UserIdChangeManager.SaveUserIdChangeToMainTable();
    });

    $("#btnUploadUserId").click(function () {
        total = 0; ok = 0; notFound = 0; notSelected = 0; kpiError = 0;
        UserIdChangeManager.UploadUserIdData();
    });
 
    //$("#btnSearch").click(function (e) {
    //    UserIdChangeHelper.ShowEmployeeGrid();
    //});
    //$("#txtEmployeeId").keypress(function (e) {
    //    if (e.keyCode == 13) {
    //        SearchEmployeeManager.SearchEmploymentInformationByEmployeeCode();
    //    }
    //});
    //$("#txtEvalutionDate").kendoDatePicker({
    //    value: new Date()
    //}).data("kendoDatePicker");
    //$("#txtEvalutionDate").parent().parent().css('width', "17.4em");
    //$("#txtEvalutionDate").data('kendoDatePicker').max(new Date());

    //$("#cmbUploderType").change(function (e) {
    //    var uploderType = $("#cmbUploderType").val();
    //    $("#txtEmployeeId").val("");
    //    gbhrRecordId = 0;
    //    if (uploderType == -1) {
    //        $("#txtEmployeeId").attr("readonly", false);
    //    }
    //});

});
var upload = false;
var UserIdChangeManager = {
    SaveUserIdChangeToMainTable: function () {
        //debugger;


        var jsonParam = "";
        var serviceUrl = "../Users/SaveDataToMainTable/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        function onSuccess(jsonData) {

            if (jsonData == "Success") {

                Message.Show("Success", "Data Uploaded To Employee Evalution Successfully", function () {
                    UserIdChangeHelper.Clear();
                });


            } else {
                Message.Warning('Excel Upload failed !');
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    },

    UploadUserIdData: function () {
       
        if (upload) {

            var jsonParam = "";
            var serviceUrl = "../Users/SaveUserIdToTempTbl/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
            //debugger;
            if (jsonData == "Success") {

                Message.Show("Success", "Excel Uploaded  Successfully", function () {
                });
                UserIdChangeHelper.GenerateUserIdChangeGrid();
                $("#DivUserIdChangeDataGrid").show();
            } else {
                Message.Warning('Excel Upload failed. Please check input data,sheet name etc');
            }
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText, [{ addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) { $noty.close(); } }]);
        }
    },
    
    gridDataSource: function () {

        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 20,

            transport: {
                read: {
                    url: '../Users/GetUserIdUpdateData',

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
}

var UserIdChangeHelper = {
    //ShowEmployeeGrid: function () {

    //    AjaxManager.PopupWindow("divEmployeeLookup", "Employee Information", "80%");
    //    SearchEmployeeManager.GetEmployeeLookupSummaryForAttendanceModule();
    //},
  
    InitializeUpload: function () {

        $("#uploadUserId").kendoUpload({
            upload: UserIdChangeHelper.onUpload,
            multiple: false,
            success: UserIdChangeHelper.onSuccess,
            error: UserIdChangeHelper.onError,
            select: UserIdChangeHelper.onSelect,
            progress: UserIdChangeHelper.onProgress,
            remove: UserIdChangeHelper.onRemove,
            async: {
                saveUrl: "../Users/UploadUserIdExcel",
                removeUrl: "../Users/UploadUserIdExcel",
                autoUpload: true
            }
        });
    },

    onUpload: function (e) {
        var files = e.files;
        $.each(files, function () {
            if ((this.extension != ".xls") && (this.extension != ".xlsx")) {
                alert("Only .xls/.xlsx files can be uploaded");
                e.preventDefault();
            }
        });
    },
    onSuccess: function (e) {
        var files = e.files;

        if (e.operation == "upload") {
            upload = true;
            $('#uploadMsg').html('File Uploaded Successfully');

        }
    },
    onError: function (e) {
        var files = e.files;
        if (e.operation == "upload") {
            alert("Failed to uploaded " + files.length + " files");
        }
    },
    onSelect: function (e) {

    },
    onProgress: function (e) {
        var getFileInfo = function () {
            return $.map(e.files, function (file) {
                var info = file.name;
                if (file.size > 0) {
                    info += " (" + Math.ceil(file.size / 1024) + " KB)";
                }
                return info;
            }).join(", ");
        };
        $('#uploadUserId').html("Upload progress : " + e.percentComplete + "% : " + getFileInfo(e));
    },

    //Grid 
    Clear: function () {
        $("#gridUserIdInfo").data("kendoGrid").dataSource.data([]);
        $("#DivUserIdChangeDataGrid").hide();
    },
    GenerateUserIdChangeGrid: function () {

        // var budgetYear = $("#cmbSelectBudgetYear").val();
        $("#gridUserIdInfo").kendoGrid({
            dataSource: UserIdChangeManager.gridDataSource(),
            //rowTemplate: '<tr class="#:Status  ==\"1\"? \"red\" : \"white\"#" data-uid="#= uid #"></tr>',
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            filterable: true,
            sortable: true,
            columns: UserIdChangeHelper.DataGridColumns(),
            editable: false,
            navigatable: true,
            selectable: "row",
            dataBound: function () {
                //debugger;
                var dataView = this.dataSource.view();
                for (var i = 0; i < dataView.length; i++) {
                    var uid = dataView[i].uid;

                    if (dataView[i].IsValid === "Valid") {
                        $("#gridUserIdInfo tbody").find("tr[data-uid=" + uid + "]").css("color", "#008000");
                    }
                    else {
                        $("#gridUserIdInfo tbody").find("tr[data-uid=" + uid + "]").css("color", "#e22b13");
                    } 
                   

                }
            },
        });
    },

    DataGridColumns: function () {

        return columns = [
            { field: "TmpUserIdChangeId", title: "BDG_EmpEvalutionTmpId", width: 50, hidden: true },
            
            { field: "FullName", title: "FullName", width: 100 },
            { field: "EmployeeId", title: "EmployeeId", width: 100 },
            { field: "BRANCHNAME", title: "BRANCHNAME", width: 80 },
            { field: "DepartmentName", title: "Department", width: 80 },
            { field: "DESIGNATIONNAME", title: "Designation", width: 80 },
            { field: "OldUserId", title: "OldUserId", width: 80 },
            { field: "NewUserId", title: "NewUserId", width: 80 },
            { field: "IsValid", title: "IsValid", width: 80 },
            //{ field: "Status", title: "Status", width: 80, template: "#=UserIdChangeHelper.SetStatus(data.Status)#" } //
        ];
    },
    SetStatus: function (status) {
        //0=OK
        //1=Employee Not Found
        //2=Not Selected for Evalution
        //3=KPI Not Found

        total += 1;

        $("#labeltotal").html('Total(' + total + ')');

        var html = "";
        if (status == 1) {
            notFound++;
            $("#labelnotFound").html('Not Found(' + notFound + ")");
            html = '<div style="background: rgb(208, 64, 64);width: 100%">Employee Not Found</div>';
            return html;
        }
        else if (status == 2) {
            notSelected++;
            $("#labelnotSelected").html('Not Selected(' + notSelected + ")");
            html = '<div style="background: rgb(215, 146, 192);width: 100%">Not Selected for Evalution</div>';
            return html;
        }
        else if (status == 3) {
            kpiError++;
            $("#labelkpiNotFound").html('KPI Not Found(' + kpiError + ")");
            html = '<div style="background: rgb(221, 250, 103);width: 100%">KPI Not Found</div>';
            return html;
        } else {
            ok++;
            $("#labelok").html('OK(' + ok + ")");
            return '';
        }
    }
}
