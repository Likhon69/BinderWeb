
var officialNoticeManager = {};

var officialNoticeHelper = {

    initiateOfficialNotice: function () {

        var empId = CurrentUser.Employee_Id;
        AjaxManager.GetApiData("/api/Notification/GetAnnouncement?empId=" + empId, "", function (data) {
            var finalData = [];
            //for (var i = 0; i < data.length; i++) {
            if (data.length > 0) {

                for (var i = 0; i < 1; i++) {
                    ////debugger;
                    var obj = new Object();

                    obj.NewsDetails = data[i].NewsDetails;//officialNoticeHelper.ConvertHtmlToString(data[i].NewsDetails);
                    obj.NewsTitle = data[i].NewsTitle;
                    obj.PublishDate = data[i].PublishDate;
                    finalData.push(obj);
                }
            }

            var objData = new Object();
            objData.Items = finalData;
            objData.Total = finalData.length;


            var dataSource = new kendo.data.DataSource({
                data: objData,
                page: 1,
                pageSize: 1,
                serverPaging: false,
                schema: {
                    total: "Total",
                    data: "Items"
                }
            });

            //$("#NoticelistViewPager").kendoPager({
            //    dataSource: dataSource
            //});

            $("#NoticelistView").kendoListView({
                dataSource: finalData,
                template: kendo.template($("#announcementTmpl").html()),
            });
            var div = $("#pnewsDetails");
            div.html(div.text());
        });

    },
    ConvertHtmlToString: function (data) {

        var regex = /(<([^>]+)>)/ig;

        var result = data.replace(regex, " ");
        if (result.length > 6000) {
            result = result.substr(0, 6000) + '...';
        }
        //console.log(result);
        return result;
    },


};

