

var FacilityDetailsManager = {

    SaveFacilityDetails: function () {
        //debugger;
        var validator = $("#divFacilityDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");

        if (validator.validate()) {
            var objFacilityDetails = FacilityDetailsHelper.CreateFacilityDetails();

            var objFacility = JSON.stringify(objFacilityDetails);
            var jsonParam = "objFacility:" + objFacility;
            var serviceUrl = "../Facility/SaveFacilityDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
      
            if (jsonData === "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Facility Saved/Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#gridFacilitySummary").data("kendoGrid").dataSource.read();
                            FacilityDetailsHelper.clearFacilityDetails();
                            $("#divgridFacilitySolution").data("kendoGrid").dataSource.read();
                            $("#divgriDepartmentToFacilityMapSolution").data("kendoGrid").dataSource.read();
                        }
                    }]);
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
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
    }
};

//helper

var FacilityDetailsHelper = {

    initFacilityDetails: function () {
 
    },

    CreateFacilityDetails: function () {

        var obj = new Object();

        obj.FacilityId = $("#hdnFacilityId").val();
        obj.FacilityCode = $("#txtFacilityCode").val();
        obj.FacilityName = $("#txtFacilityName").val();
        obj.IsActive = $("#chkFacilityIsActive").is(':checked') === true ? 1 : 0;

        return obj;
    },

    populateFacilityDetails: function (obj) {

        if (obj != null) {
            $("#hdnFacilityId").val(obj.FacilityId);
            $("#txtFacilityCode").val(obj.FacilityCode);
            $("#txtFacilityName").val(obj.FacilityName);
            $("#chkFacilityIsActive").val(obj.IsActive);
            if (obj.IsActive == 1) {
                $("#chkFacilityIsActive").prop('checked', 'checked');
            } else {
                $("#chkFacilityIsActive").removeProp('checked', 'checked');
            }
        } 

    },

    clearFacilityDetails: function () {

        $("#hdnFacilityId").val("0");
        $("#txtFacilityCode").val("");
        $("#txtFacilityName").val("");
        $("#chkFacilityIsActive").removeAttr("checked", false);
        $("#divFacilityDetails > form").kendoValidator();
        $("#divFacilityDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");
    },


    FacilityPopUpWindow: function () {
        $("#divFacilitySettings").kendoWindow({
            title: "Facility Details",
            resizeable: false,
            width: "80%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
    },

    clickEventForAddNewFacilityButton: function () {
        FacilityDetailsHelper.clearFacilityDetails();
        $("#divFacilitySettings").data("kendoWindow").open().center();

    },

    clickEventForcloseFacilityButton: function () {
        FacilityDetailsHelper.clearFacilityDetails();
        $("#FacilityDiv").data("kendoWindow").close();
    },
};