$(document).ready(function () {
    DesignationLinkedManager.init();

});

var DesignationLinkedManager = {
    init: function () {

        empressCommonHelper.GenerateDesignationAllCombo("cmbParentDesignationName");
        $("#btnSave").click(function () {
            DesignationLinkedManager.SaveConnection();
        });
        $("#btnCancel").click(function () {
            DesignationLinkedManager.Cancel();
        });

    },
    SaveConnection: function () {
        var obj = new Object();
        obj.DesignationId = $("#txtDesignationId").val();
        obj.ParentDesignationId = $("#cmbParentDesignationName").val();


        if (obj.DesignationId == obj.ParentDesignationId) {

            alert("Selected designation and parent designation can not be same");

        } else {
            var param = "degination:" + JSON.stringify(obj);
            var url = "../Designation/SaveDesignationLinked";
            AjaxManager.SaveObject(url, param, function () {

                organogramManager.populateDesignationDiagram();

                $("#addConnWind").data("kendoWindow").close();
            });
        }





    },
    Cancel: function () {

        $("#addConnWind").data("kendoWindow").close();

    }
}