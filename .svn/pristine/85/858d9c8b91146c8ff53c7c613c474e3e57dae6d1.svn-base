
var DivisionDetailsManager = {

    InitDivisionDetails: function () {
 
    },
    SaveDivision: function() {
        ////debugger;
        var validator = $("#divDivisionDetailsInfo").kendoValidator().data("kendoValidator"),
            status = $("status");

        if (validator.validate()) {
            ////debugger;
            var objDivision = DivisionDetailsHepler.CreateDivision();

            //var objDivisionInfo = JSON.stringify(objDivision).replace('&', '^');
            var objDivisionInfo = JSON.stringify(objDivision);
 
            var jsonParam = 'objDivisionInfo:' + objDivisionInfo ;
            var serviceUrl = "../Division/SaveDivision";
            AjaxManager.SendJson2(serviceUrl, jsonParam, onSuccess, onFailed);
        }

        function onSuccess(jsonData) {

            if (jsonData == "Success") {
                AjaxManager.MsgBox('success', 'center', 'Success', 'Division Information Saved/Updated Successfully',
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function($noty) {
                            $noty.close();
                            $("#gridDivisionSummary").data("kendoGrid").dataSource.read();
                            DivisionDetailsHepler.clearDivision();
                            $("#divgridDivisionSolution").data("kendoGrid").dataSource.read();
                        }
                    }
                ]);
            } else {
                AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [
                    {
                        addClass: 'btn btn-primary',
                        text: 'ok',
                        onClick: function($noty) {
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
                    onClick: function($noty) {
                        $noty.close();
                    }
                }
            ]);
        }
    }
};

var DivisionDetailsHepler = {

    CreateDivision: function () {
        ////debugger;
        var obj = new Object();
        obj.DivisionId = $("#hdnDivisionId").val();
        obj.DivisionCode = $("#txtDivisionCode").val(); 
        obj.DivisionName = $("#txtDivisionName").val();
        obj.IsActive = $("#chkDivisionIsActive").is(':checked') == true ? 1 : 0;

        return obj;
    },
    populateDivision: function (obj) {
        if (obj != null) {
            $("#hdnDivisionId").val(obj.DivisionId);
            $("#txtDivisionCode").val(obj.DivisionCode);
            $("#txtDivisionName").val(obj.DivisionName);
            if (obj.IsActive == 1) {
                $("#chkDivisionIsActive").prop('checked', 'checked');
            } else {
                $("#chkDivisionIsActive").removeProp('checked', 'checked');
            }
        }   
    },

    clearDivision: function () {
        $("#hdnDivisionId").val("0");
        $("#txtDivisionCode").val("");
        $("#txtDivisionName").val("");
        $("#chkDivisionIsActive").removeAttr("checked", false);
    },


 DivisionPopUpWindow: function () {
     $("#divDivision").kendoWindow({
            title: "Division Details",
            resizeable: false,
            width: "80%",
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
        });
    },
    
 clickEventForAddNewDivisionButton: function () {
     ////debugger;
    DivisionDetailsHepler.clearDivision();
    $("#divDivision").data("kendoWindow").open().center();

},
 clickEventForcloseDivisionButton: function () {
     DivisionDetailsHepler.clearDivision();
     $("#divisionDiv").data("kendoWindow").close();
 },

};

