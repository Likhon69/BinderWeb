
var isLeaveAlreadyLoded = false;

var leaveStatusManager = {
    LeaveAppliedStatus: function () {
        var objStatus = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/LeaveAppliedStatus";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objStatus = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objStatus;
    },
};

var leaveStatusHelper = {

    initiateLeaveStatus: function () {

        var effect = kendo.fx("#divContainerLeave").flipHorizontal($("#divLeaveMain"), $("#divMyLeave")).duration(1000),
             reverse = false;

        $(".toggleLeave").click(function () {
            effect.stop();
            reverse ? effect.reverse() : effect.play();
            reverse = !reverse;
            if (isLeaveAlreadyLoded == false) {
                leaveStatusHelper.GenerateLeaveData();
            }
        });

       
    },
    
    GenerateLeaveData: function() {
        var objLeave = leaveStatusManager.LeaveAppliedStatus();
        if (objLeave != null) {
            //debugger;
            $("#spnLeaveApplied").html(objLeave.Pending);
            $("#spnLeaveDraft").html(objLeave.Draft);
            $("#spnLeaveCanceled").html(objLeave.Canceled);
            $("#spnLeaveRejected").html(objLeave.Rejected);
            $("#spnLeaveApproved").html(objLeave.Approved);
            isLeaveAlreadyLoded = true;
        }
    }


};