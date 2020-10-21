$(document).ready(function () {
    EmailContentHelper.initEmailContent();
});

var EmailContentHelper = {
    initEmailContent: function () {
        

        empressCommonHelper.populateDropDownList('cmbNotificationType', 'EmailNotificationTypeName', 'EmailNotificationTypeId', "../EmailConfiguration/GetNotificationType");
        KendoControlManager.KendoTemplateEditor("editorBody");
        KendoControlManager.KendoGrid("gridEmailContent",  EmailContentHelper.createColumns());

        
        $("#btnAddEmail").click(function () {
            $("#divEmailContent").show();
            $("#divEmailSummary").hide();
            EmailContentHelper.clearEmailContentForm();

        });
        $("#btnCloseEmail").click(function () {
            $("#divEmailContent").hide();
            $("#divEmailSummary").show();

        });
        $("#btnSaveEmail").click(function () {
            EmailContentHelper.SaveEmailContent();

        });

        $("#cmbNotificationType").change(function () {
            var ddl = $("#cmbNotificationType").data('kendoDropDownList');
            var oNotiType = ddl.dataItem(ddl.select());

            var typeId = oNotiType.EmailNotificationTypeId;
            var def = oNotiType.ParamDefination;
            $("#spnParam").html(def);
            var url = '../EmailConfiguration/GetEmailContentGridDataSource/?notificationTypeId='+typeId;
            var dataSource = KendoDataSourceManager.getGridDataSource(url, 20);
            var grid = $("#gridEmailContent").data('kendoGrid');
            grid.setDataSource(dataSource);
        });

    },

    SaveEmailContent: function () {
       
        var obj = EmailContentHelper.CreateEmailObject();
        var jsonParam = 'emailContent:' + JSON.stringify(obj);
        var serviceUrl = "../EmailConfiguration/SaveEmailContent/";
        AjaxManager.SendJson2(serviceUrl, jsonParam, function (response) {
            Message.Show("Success", "Email content saved successfully.", function () {

                var grid = $("#gridEmailContent").data('kendoGrid');
                grid.dataSource.read();

            });

        }, function (err) {

        });


    },
    CreateEmailObject: function () {
        var obj = new Object();
        obj.EmailContentId = $("#hdnEmailContentId").val();
        obj.EmailNotificationId = $("#cmbNotificationType").data('kendoDropDownList').value();
        obj.EmailSubject = $("#txtEmailSubject").val();
        obj.EmailTitle = $("#txtEmailTitle").val();
        obj.SMSBody = $("#txtSMSBody").val() == "" ? " " : $("#txtSMSBody").val();
        obj.EmailContentId = $("#hdnEmailContentId").val();
        obj.EmailBody = $("#editorBody").data().kendoEditor.value();
        obj.EmailContentStatus = $("#chkStatus").is(":checked") ? 1 : 0;

        return obj;

    },
    createColumns: function () {
        return columns = [
            { field: "EmailContentId", title: "EmailContentId", width: 50, hidden: true },
            { field: "EmailTitle", title: "Title", width: 100, sortable: true },
            { field: "SMSBody", title: "SMS Content", width: 100, sortable: true },
            { field: "EmailBody", title: "Email Content", width: 100, sortable: true, template: kendo.template("#=EmailBody#") , hidden: true},
            { field: "EmailSubject", title: "Subject", width: 100,hidden: true },
            { field: "EmailContentStatus", title: "Status", width: 30, sortable: true, template: "#= (EmailContentStatus==1) ? 'Active' : 'Inactive' #" },
            { field: "Edit", title: "Edit", filterable: false, width: 30, template: '<input type="button" class="k-button" value="Edit"  onClick="EmailContentHelper.clickEventForEditButton()"  />', sortable: false }
        ];
    },
    clickEventForEditButton: function () {
        var grid = $("#gridEmailContent").data('kendoGrid');
        var dataItem = grid.dataItem(grid.select());
        if (dataItem != null) {
            EmailContentHelper.fillEmailContentForm(dataItem);
        }
    },
    fillEmailContentForm: function (obj) {
        //debugger;
        $("#hdnEmailContentId").val(obj.EmailContentId);
        $("#cmbNotificationType").data('kendoDropDownList').value(obj.EmailNotificationId);
        $("#txtEmailSubject").val(obj.EmailSubject);
        $("#txtEmailTitle").val(obj.EmailTitle);
        $("#txtSMSBody").val(obj.SMSBody);
        $("#spnParam").html(obj.ParamDefination);
        $("#editorBody").data().kendoEditor.value(obj.EmailBody);

        if (obj.EmailContentStatus == 1) {
            $("#chkStatus").prop('checked', true);
        } else {
            $("#chkStatus").prop('checked', false);

        }

        $("#divEmailContent").show();
        $("#divEmailSummary").hide();
    },
    clearEmailContentForm: function () {
        $("#hdnEmailContentId").val('');
      //  $("#cmbNotificationType").data('kendoDropDownList').value('');
        $("#txtEmailSubject").val('');
        $("#txtEmailTitle").val('');
        $("#txtSMSBody").val('');
        $("#editorBody").data().kendoEditor.value('');
        $("#chkStatus").prop('checked', false);

    }

};

