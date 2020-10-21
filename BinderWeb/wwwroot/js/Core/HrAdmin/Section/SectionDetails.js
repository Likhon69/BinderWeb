

var SectionDetailsManager = {
        
    SaveSectionDetails: function () {
        //debugger;
        var validator = $("#divSectionDetails").kendoValidator().data("kendoValidator"),
            status = $(".status");

        if (validator.validate()) {
            var objSectionDetails = SectionDetailsHelper.CreateSectionDetails();

            var objSection = JSON.stringify(objSectionDetails);
            var jsonParam = "objSection:" + objSection;
            var serviceUrl = "../Section/SaveSectionDetails";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {
      
            if (jsonData === "Success") {

                AjaxManager.MsgBox('success', 'center', 'Success:', 'Section Saved/Updated Successfully',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            $("#gridSectionSummary").data("kendoGrid").dataSource.read();
                            SectionDetailsHelper.clearSectionDetails();
                            $("#divgridFacilityToSectionMapSolution").data("kendoGrid").dataSource.read();
                            $("#divgridDeptToSectionMapSolution").data("kendoGrid").dataSource.read();
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

var SectionDetailsHelper = {

    initSectionDetails: function () {
     
    },

    CreateSectionDetails: function () {
       
        var obj = new Object();
        
        obj.SectionId = $("#hdnSectionId").val();
        obj.SectionCode = $("#txtSectionCode").val();
        obj.SectionName = $("#txtSectionName").val();
        obj.IsActive = $("#chkSectionIsActive").is(':checked') === true ? 1 : 0;

        return obj;
    },

    populateSectionDetails: function (obj) {

        if (obj != null) {
            $("#hdnSectionId").val(obj.SectionId);
            $("#txtSectionCode").val(obj.SectionCode);
            $("#txtSectionName").val(obj.SectionName);
            $("#chkSectionIsActive").val(obj.IsActive);
            if (obj.IsActive == 1) {
                $("#chkSectionIsActive").prop('checked', 'checked');
            } else {
                $("#chkSectionIsActive").removeProp('checked', 'checked');
            }
        }

    },

    clearSectionDetails: function () {

        $("#hdnSectionId").val("0");
        $("#txtSectionCode").val("");
        $("#txtSectionName").val("");
        $("#chkSectionIsActive").removeAttr("checked", false);
        $("#divSectionDetails > form").kendoValidator();
        $("#divSectionDetails").find("span.k-tooltip-validation").hide();
        var status = $(".status");

        status.text("").removeClass("invalid");
    },


    SectionPopUpWindow: function () {
        $("#divSectionSettings").kendoWindow({
            title: "Section Details",
            resizeable: false,
            width: "80%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
    },

    clickEventForAddNewSectionButton: function () {
        SectionDetailsHelper.clearSectionDetails();
        $("#divSectionSettings").data("kendoWindow").open().center();

    },

    clickEventForcloseSectionButton: function () {
        SectionDetailsHelper.clearSectionDetails();
        $("#SectionDiv").data("kendoWindow").close();
    },
};