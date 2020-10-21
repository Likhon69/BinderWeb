$(document).ready(function () {

    commonReportParamHelper.initiateCommonReportParam();
    dottedLineGroupConfigSettingsHelper.createTab();
    dottedLineGroupHelper.DottedLineGroupNameCombo();
    empressCommonHelper.initePanelBer("liIdentityPanelEmployee");
    empressCommonHelper.initePanelBer("liIdentityPanelEmployeeParameter");
    empressCommonHelper.initePanelBer("liIdentityPanelEmployeeOfGroup");

    dottedLineGroupHelper.GenerateDottedLineEmployeeOfGroupGrid();

    $("#divAddDottedLineNewGroup").kendoWindow({
        title: "Dotted Line Group Information Details",
        resizeable: false,
        width: "60%",
        actions: ["Pin", "Refresh", "Maximize", "Close"],
        modal: true,
        visible: false
    });

    $("#btnGroupSave").click(function () {

        dottedLineGroupManager.SaveDottedLineGroupInfo();

    });


    $("#btnSave").click(function () {
        
        dottedLineGroupConfigSettingsManager.SaveDottedLineGroupMemberByGroup();


    });

    $("#btnGroupClear").click(function () {
        dottedLineGroupHelper.clearDottedLineGroupForm();
    });

     $("#btnGroupClose").click(function () {
        $("#divAddDottedLineNewGroup").data("kendoWindow").close();
    });

    dottedLineGroupHelper.GenerateDottedLineGroupGrid();
    dottedLineMemberSummaryHelper.GeRowDataForEmployeeGrid();
    dottedLineMemberSummaryHelper.GenerateDottedLineMemberSummaryGrid();
    $("#btnLoad").click(function () {


        dottedLineMemberSummaryHelper.GenerateDottedLineMemberSummaryGrid();
       // dottedLineMemberSummaryHelper.GeRowDataForEmployeeGrid();
    });
});

var dottedLineGroupConfigSettingsManager = {
    openDottedLineGroupAddPopup: function () {
        $("#divAddDottedLineNewGroup").data("kendoWindow").open().center();
    },

    SaveDottedLineGroupMemberByGroup: function () {



        var dottedLineGroupMemberByGroupObj = dottedLineGroupConfigSettingsHelper.CreateDottedLineGroupMemberByGroupObject();

        var dottedLineGroupMemberByGroupObjInfo = JSON.stringify(dottedLineGroupMemberByGroupObj);
        var jsonParam = 'dottedLineMemberByGroup:' + dottedLineGroupMemberByGroupObjInfo;
        var serviceUrl = "../DottedLineGroupConfig/SaveDottedLineGroupMemberByGroup/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);




        function onSuccess(jsonData) {
            if (jsonData == "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Member Saved Successfully in Group',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'Ok',
                        onClick: function ($noty) {
                            $noty.close();
                             dottedLineMemberSummaryHelper.ClearGrid();
                            dottedLineMemberSummaryHelper.GenerateDottedLineMemberSummaryGrid();
                            dottedLineGroupHelper.GenerateDottedLineEmployeeOfGroupGrid();
                           


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
};

var dottedLineGroupConfigSettingsHelper = {
    createTab: function () {
        $("#tabstrip").kendoTabStrip({});
    },

    CreateDottedLineGroupMemberByGroupObject: function () {

        var objDottedLineGroupMemberByGroup = new Object();
        objDottedLineGroupMemberByGroup.DottedLineGroupMappingId = $("#hdnDottedLineGroupMappingId").val();

        objDottedLineGroupMemberByGroup.DottedLineGroupId = $("#txtGroupName").data("kendoComboBox").value();
        var ids = [];
        for (var i = 0; i < employeeSummaryArray.length; i++) {
            ids.push(employeeSummaryArray[i].HRRecordId);
        }
        //debugger;
        objDottedLineGroupMemberByGroup.HrRecordIds = ids;
        return objDottedLineGroupMemberByGroup;
    },

};