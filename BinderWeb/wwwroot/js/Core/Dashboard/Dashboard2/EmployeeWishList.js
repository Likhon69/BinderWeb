
var EmployeeWishListManager = {};

var EmployeeWishListHelper = {

    initiateWishList: function () {

        EmployeeWishListHelper.BirthDayPopulate();
        EmployeeWishListHelper.AnniversariesPopulate();
        EmployeeWishListHelper.NewJoinerPopulate();

        $("#BirthdaylistView").addClass('wish-list-view ');
        $("#AnniversarieslistView").addClass('wish-list-view ');
        $("#NewJoinerslistView").addClass('wish-list-view');

        //$("#AnniversarieslistView").css('height', '190px');
        //$("#NewJoinerslistView").css('height', '190px');

        //$("#BirthdaylistView").css('width', '254px');
        //$("#AnniversarieslistView").css('width', '254px');
        //$("#NewJoinerslistView").css('width', '254px');
    },

    BirthDayPopulate: function () {
        var empId = CurrentUser.Employee_Id;
        AjaxManager.GetApiData("/api/Notification/GetUpcommingBirthday", "", function (data) {
            var finalData = [];
            for (var i = 0; i < data.length; i++) {
            //for (var i = 0; i < 1; i++) {
                ////debugger;
                var obj = new Object();

                obj.EmployeeName = data[i].EmployeeName + " ( " + data[i].EmployeeId + " )";
                obj.EmployeeId = data[i].EmployeeId;
                obj.AnniversaryDate = kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "dd") + " " + kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "MMM");//+" " + kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "dddd");

                finalData.push(obj);
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
            $("#BirthdaylistView").kendoListView({
                dataSource: finalData,
                template: kendo.template($("#BirthdayTmpl").html()),
            });

        });

    },
    AnniversariesPopulate: function () {

        var empId = CurrentUser.Employee_Id;
        AjaxManager.GetApiData("/api/Notification/GetUpcommingWorkingAnniversary", "", function (data) {
            var finalData = [];
            for (var i = 0; i < data.length; i++) {
            //for (var i = 0; i < 1; i++) {
                ////debugger;
                var obj = new Object();

                obj.EmployeeName = data[i].EmployeeName + " ( " + data[i].EmployeeId + " )";
                obj.EmployeeId = data[i].EmployeeId;
                obj.AnniversaryDate = kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "dd") + " " + kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "MMM");// + " " + kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "dddd");
                obj.Years = data[i].Years;
                finalData.push(obj);
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
            $("#AnniversarieslistView").kendoListView({
                dataSource: finalData,
                template: kendo.template($("#AnniversariesTmpl").html()),
            });

        });

    },
    NewJoinerPopulate: function () {

        var empId = CurrentUser.Employee_Id;
        AjaxManager.GetApiData("/api/Employee/GetNewJoinerEmployee", "", function (data) {
            var finalData = [];
            for (var i = 0; i < data.length; i++) {
            //for (var i = 0; i < 1; i++) {
                ////debugger;
                var obj = new Object();

                obj.EmployeeName = data[i].EmployeeName + " ( " + data[i].EmployeeId + " )";
                obj.EmployeeId = data[i].EmployeeId;
                obj.AnniversaryDate = data[i].EmploymentDate;//kendo.toString(kendo.parseDate(data[i].EmploymentDate), "dd") + " " + kendo.toString(kendo.parseDate(data[i].EmploymentDate), "MMM"); //+ " " + kendo.toString(kendo.parseDate(data[i].AnniversaryDate), "dddd");
                finalData.push(obj);
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
            $("#NewJoinerslistView").kendoListView({
                dataSource: finalData,
                template: kendo.template($("#BirthdayTmpl").html()),
            });

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