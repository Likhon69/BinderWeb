
var PSOLocationDetailsManager = {

    SavePSOLocation: function () {
        var validator = $("#divPSOLocationDetailsInfo").kendoValidator().data("kendoValidator"),
            status = $("status");

        if (validator.validate()) {
            var objPsoLocation = PSOLocationDetailsHepler.CreatePSOLocation();
            var objPsoLocationInfo = JSON.stringify(objPsoLocation).replace('&', '^');

            var jsonParam = 'objPsoLocationInfo:' + objPsoLocationInfo;
            var serviceUrl = "../PSOLocation/SavePsoLocation";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'PSO Location Info Saved/Updated Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                            $("#gridPSOLocationSummary").data("kendoGrid").dataSource.read();
                            PSOLocationDetailsHepler.clearPSOLocation();
                        }
                    }
                ]);
            }
            else if (jsonData == "Exist") {
                AjaxManager.MsgBox('warning', 'center', 'warning', 'PSO Location Code already exist',
             [
                 {
                     addClass: 'btn btn-primary',
                     text: 'ok',
                     onClick: function ($noty) {
                         $noty.close();
                     }
                 }
             ]);
            }
            else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function ($noty) {
                            $noty.close();
                        }
                    }
                ]);
            }
        }

        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
            [
                {
                    addClass: 'btn btn-primary',
                    text: 'ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }
            ]);
        }
    }
};

var PSOLocationDetailsHepler = {

    CreatePSOLocation: function () {
        var obj = new Object();
        obj.PSOLocationId = $("#hdnPSOLocationId").val();
        obj.PSOLocationCode = $("#txtPSOLocationCode").val();
        obj.PSOLocationName = $("#txtPSOLocationName").val();
        obj.DSMLocationCode = $("#txtDSMLocationCode").val();
        obj.IsActive = $("#chkPSOLocationIsActive").is(':checked') == true ? 1 : 0;

        return obj;
    },
    populatePSOLocation: function (obj) {
        if (obj != null) {
            $("#hdnPSOLocationId").val(obj.PSOLocationId);
            $("#txtPSOLocationCode").val(obj.PSOLocationCode);
            $("#txtPSOLocationName").val(obj.PSOLocationName);
            $("#txtDSMLocationCode").val(obj.DSMLocationCode);
            if (obj.IsActive == 1) {
                $("#chkPSOLocationIsActive").prop('checked', 'checked');
            } else {
                $("#chkPSOLocationIsActive").removeProp('checked', 'checked');
            }
        }
    },

    clearPSOLocation: function () {
        $("#hdnPSOLocationId").val("0");
        $("#txtPSOLocationCode").val("");
        $("#txtPSOLocationName").val("");
        $("#txtDSMLocationCode").val("");
        $("#chkPSOLocationIsActive").removeAttr("checked", false);

        $("#divPSOLocationDetailsInfo > form").kendoValidator();
        $("#divPSOLocationDetailsInfo").find("span.k-tooltip-validation").hide();
        var status = $(".status");
        status.text("").removeClass("invalid");
    }
};

