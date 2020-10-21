var reportArray = [];
var reportPermisionArray = [];

var reportPermissionManager = {
    
    GetCustomizedReportInfo: function() {
        
        var objStatusList = "";
        var jsonParam = "";
        var serviceUrl = "../QueryAnalyzer/GetCustomizedReportInfo/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            objStatusList = jsonData;
        }
        function onFailed(error) {

            window.alert(error.statusText);
        }
        return objStatusList;

    }

};

var reportPermissionHelper = {
    
    GetReportInformation: function () {
        reportArray = [];

        var objReportList = reportPermissionManager.GetCustomizedReportInfo();
        var link = "";

        for (var i = 0; i < objReportList.length; i++) {
            link += "<div><input type=\"checkbox\" class=\"chkBox\" id=\"chkReport" + objReportList[i].ReportHeaderId + "\" onclick=\"reportPermissionHelper.populateCustmizedReportArray(" + objReportList[i].ReportHeaderId + ", this.id)\"/>" +
                "<a class=\"alinkGroup \" title=\"View Report Permision\"  id=\"areport" + objReportList[i].ReportHeaderId + "\" onclick=\"reportPermissionHelper.populateCustmizedReportArray(" + objReportList[i].ReportHeaderId + "', this.id)\">" + objReportList[i].ReportHeader + "</a></div>";
            reportArray.push(objReportList[i]);
        }
        $("#checkboxReportPermission").html(link);

    },
    
    populateCustmizedReportArray: function (reportHeaderId) {
        if ($("#chkReport" + reportHeaderId).is(':checked') == true) {
            var obj = new Object();
            obj.ReferenceID = reportHeaderId;
            obj.ParentPermission = -1;
            obj.PermissionTableName = "Customized Report";
            reportPermisionArray.push(obj);
            $(".alinkGroup").removeClass("stateBackground");
            $("#areport" + reportHeaderId).addClass("stateBackground");
        }
        else {
            for (var i = 0; i < reportPermisionArray.length; i++) {
                if (reportPermisionArray[i].ReferenceID == reportHeaderId) {
                    reportPermisionArray.splice(i, 1);
                    break;
                }
            }
        }
    },
    
    CreateReportPermision: function (objGroupInfo) {
        objGroupInfo.ReportList = reportPermisionArray;
        return objGroupInfo;
    },

    clearReportPermision: function () {
        reportPermisionArray = [];
        $('.chkBox').attr('checked', false);
    },
    
    populateExistingReportInArray: function (objGroupPermision) {
        reportPermisionArray = [];
        for (var i = 0; i < objGroupPermision.length; i++) {
            if (objGroupPermision[i].PermissionTableName == "Customized Report") {
                var obj = new Object();
                obj.ReferenceID = objGroupPermision[i].ReferenceID;
                obj.ParentPermission = objGroupPermision[i].ParentPermission;
                obj.PermissionTableName = "Customized Report";
                $('#chkReport' + objGroupPermision[i].ReferenceID).attr('checked', true);

                reportPermisionArray.push(obj);
            }
        }
    },

};