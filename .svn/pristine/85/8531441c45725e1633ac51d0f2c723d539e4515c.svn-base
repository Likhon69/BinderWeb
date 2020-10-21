

var dottedLineGroupManager = {
    SaveDottedLineGroupInfo: function () {

        if (dottedLineGroupHelper.DottedLineGroupValidator()) {
            
            var dottedLineGroupObj = dottedLineGroupHelper.CreateDottedLineGroupObject();
           
            var dottedLineGroupObjInfo = JSON.stringify(dottedLineGroupObj);
            var jsonParam = 'dottedLineGroup:' + dottedLineGroupObjInfo;
            var serviceUrl = "../DottedLineGroupConfig/SaveDottedLineGroupInfo/";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);

        }

        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Group Saved Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                          //  $("#gridCriticalJobSummary").data("kendoGrid").dataSource.read();
                            $("#divAddDottedLineNewGroup").data("kendoWindow").close();
                             dottedLineGroupHelper.DottedLineGroupNameCombo();

                            dottedLineGroupHelper.clearDottedLineGroupForm();
                            dottedLineGroupHelper.GenerateDottedLineEmployeeOfGroupGrid();
                            dottedLineGroupHelper.GenerateDottedLineGroupGrid();
                        }


                    }

                ]);
            } else {
                AjaxManager.MsgBox('warning', 'center', 'Warning', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
            }

        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
          [{
              addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                  $noty.close();
              }
          }]);
        }
    },

    gridDottedLineEmployeeOfGroupDataSource: function () {
     //debugger;
         var groupId = $("#txtGroupName").data("kendoComboBox").value();
       
        if(groupId=="" || groupId==null){
        groupId=0;
        }
      
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../DottedLineGroupConfig/GetDottedLineEmployeeOfGroupList/?&group=' + groupId,
 
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

    gridDottedLineGroupDataSource: function () {
     //debugger;
         var groupId = $("#txtGroupName").data("kendoComboBox").value();
       
        if(groupId=="" || groupId==null){
        groupId=0;
        }
      
        var gridDataSource = new kendo.data.DataSource({
            type: "json",
            serverPaging: true,

            serverSorting: true,

            serverFiltering: true,

            allowUnsort: true,

            pageSize: 10,

            transport: {
                read: {
                    url: '../DottedLineGroupConfig/GetDottedLineGroupList',
 
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

      deleteMemberofGroupDataSource: function (HRRecordId) {
        //debugger;
        var jsonParam = 'objHRRecordId:' + HRRecordId;
        var serviceUrl = "../DottedLineGroupConfig/DeleteMemberofDottelLineGroup";
        AjaxManager.SendJson2(serviceUrl, jsonParam, function (jsonData) {
            if (jsonData == "Success") {
                Message.Success('Member Delete Successfully');
                $("#gvEmployeeDetailsOfGroup").data("kendoGrid").dataSource.read();
            } else {
                Message.Warning(jsonData);
            }
        }, function (error) {
            Message.Warning(error.statusText);
        });

    },

   };

var dottedLineGroupHelper = {

   DottedLineGroupNameCombo: function () {
     
        var objGroupName = new Object;
        objGroupName = AjaxManager.GetDataSource("../DottedLineGroupConfig/GetAllGroupNameCombo");
        $("#txtGroupName").kendoComboBox({
            placeholder: "Select Group",
            dataTextField: "GroupName",
            dataValueField: "DottedLineGroupId",
            dataSource: objGroupName,
            filter: "contains",
            suggest: true,

            change: function (e) {
                
                var groupId=this.value();
                 dottedLineGroupHelper.GenerateDottedLineEmployeeOfGroupGrid(groupId);
            }
            


        });

    },

       CreateDottedLineGroupObject: function () {

        var objDottedLineGroup = new Object();
        objDottedLineGroup.DottedLineGroupId = $("#hdnDottedLineGroupId").val();
        
        objDottedLineGroup.GroupName = $("#txtGroupNameText").val();
        objDottedLineGroup.Description = $("#tareaDescription").val();
        objDottedLineGroup.IsActive = $("#chkDottedLineGroupIsActive").is(':checked') == true ? 1 : 0;

        return objDottedLineGroup;
    },

     DottedLineGroupValidator: function () {
        var validator = $("#divAddDottedLineNewGroup").kendoValidator().data("kendoValidator"),
            status = $(".status");
        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

     clearDottedLineGroupForm: function () {
        $("#hdnDottedLineGroupId").val("");
        $("#txtGroupNameText").val("");
        $("#tareaDescription").val("");
    $('#chkDottedLineGroupIsActive').attr('checked', false);

    $("#divCriticalJob > form").kendoValidator();
    $("#divCriticalJob").find("span.k-tooltip-validation").hide();
    var status = $(".status");

    status.text("").removeClass("invalid");

    },

     GenerateDottedLineEmployeeOfGroupGrid: function () {
        
        $("#gvEmployeeDetailsOfGroup").kendoGrid({
            dataSource: dottedLineGroupManager.gridDottedLineEmployeeOfGroupDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: dottedLineGroupHelper.GenerateDottedLineEmployeeOfGroupColumns(),
            editable: false,
            //Toolbar: ["create"],
            //navigatable: true,
            selectable: "multiple",

            //selectable: false

        });
    },

    GenerateDottedLineEmployeeOfGroupColumns: function () {
        return columns = [
         { filed: "DottedLineGroupMappingId", title: "DottedLineGroupMappingId", width: 50, hidden: true },
          { filed: "HRRecordId", title: "HrRecordId", width: 50, hidden: true },

          { field: "EmployeeId", title: "Employee Code", width: 150, sortable: false },
           { field: "FullName", title: "Employee Name", width: 350, sortable: false },

           {
               field: "Delete", title: "Delete", filterable: false, width: 50, template:
                  '<button type="button" value="Delete" id="btnDelete" class="k-button" onClick="dottedLineGroupHelper.deleteMemberofGroup()"><span class="k-icon k-i-pencil">Delete</span></button>', sortable: false
            }


        ];
    },

     deleteMemberofGroup: function () {
         //debugger;
        var entityGrid = $("#gvEmployeeDetailsOfGroup").data("kendoGrid");
        var selectedItem = entityGrid.dataItem(entityGrid.select());
        dottedLineGroupManager.deleteMemberofGroupDataSource(selectedItem.HRRecordId);
    },
 

    PopulateDottedLineGroupDetails: function (objDottedLineGroup) {



        $("#hdnDottedLineGroupId").val(objDottedLineGroup.DottedLineGroupId);
        $("#txtGroupNameText").val(objDottedLineGroup.GroupName);

        $("#tareaDescription").val(objDottedLineGroup.Description);
        if (objDottedLineGroup.IsActive == 1) {
            $("#chkDottedLineGroupIsActive").prop('checked', 'checked');
        } else {
            $("#chkDottedLineGroupIsActive").removeProp('checked', 'checked');
        }
       

    },

     GenerateDottedLineGroupColumns: function () {
        return columns = [
         
          { filed: "DottedLineGroupId", title: "DottedLineGroupId", width: 50, hidden: true },

          { field: "GroupName", title: "Group Name", width: 150, sortable: false },
           { field: "Description", title: "Description", width: 350, sortable: false },
           { field: "IsActive", title: "Status", width: 50, sortable: false, template: "#=IsActive==1?'Active':'In Active'#" },
        { field: "Edit", title: "Edit", filterable: false, width: 50, template: '<button type="button" class="k-button" value="Edit" id="btnDottedLineGroupsEdit" onClick="dottedLineGroupHelper.clickEventForDottedLineGroupEditButton()" ><span class="k-icon k-i-pencil"></span></button>', sortable: false }


        ];
    },

     GenerateDottedLineGroupGrid: function () {
        
        $("#gvGroup").kendoGrid({
            dataSource: dottedLineGroupManager.gridDottedLineGroupDataSource(),
            pageable: {
                refresh: true,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },
            xheight: 450,
            filterable: true,
            sortable: true,
            columns: dottedLineGroupHelper.GenerateDottedLineGroupColumns(),
            editable: false,
            //Toolbar: ["create"],
            //navigatable: true,
            selectable: "multiple"

            //selectable: false

        });
    },

   clickEventForDottedLineGroupEditButton: function () {
        var gridData = $("#gvGroup").data("kendoGrid");
      var selectedItem = gridData.dataItem(gridData.select());
         if (selectedItem != null) {
           
            dottedLineGroupHelper.PopulateDottedLineGroupDetails(selectedItem);
            //$("#divCriticalJob").data("kendoWindow").open().center();
        }

    }

};