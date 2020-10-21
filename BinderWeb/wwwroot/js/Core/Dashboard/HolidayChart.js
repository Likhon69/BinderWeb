
var gbDate = null;
var firstTime = 0;
var holidayChartManager = {
    //LoadHolidayCalender: function () {
    //    var jsonParam = "year=" + $("#cmbYear").val() + "&mnth=" + $("#cmbMonth").val();

    //    var serviceURL = "../Calender/LoadHolidayCalenderView";
    //    AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);
    //    function onSuccess(jsonData) {
    //        $('#HolidayChart').html(jsonData);
    //    }

    //    function onFailed(error) {
    //        window.alert(error.statusText);
    //    }
    //},
    
    GetServerTime: function () {
        var obj = null;
        var jsonParam = "";
        var url = "../Dashboard/GetServerTime";
        AjaxManager.GetJsonResult(url, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return obj;
    },
    
    GetHolidayInfoByMonth: function (calenderDate) {
        var obj = null;
        var jsonParam = "calenderMonth=" + calenderDate;
        var url = "../Dashboard/GetHolidayInfoByMonth";
        AjaxManager.GetJsonResult(url, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return obj;

    }
};

var holidayChartHelper = {
    
    initiateHolidayCalenderForDashboard: function() {
        myLeaveStatusHelper.GenerateMyLeaveStatusGrid();
        var calenderDate = holidayChartManager.GetServerTime();
        
        holidayChartHelper.changeCalender(calenderDate);
        
    },
    
    changeCalender: function(calenderDate) {
        gbDate = new Date(calenderDate);
        var holidayInfo = holidayChartManager.GetHolidayInfoByMonth(calenderDate);

        
        
        var finalArray = holidayInfo;
        $("#calendar1").kendoCalendar({
            value: new Date(calenderDate),
            dates: finalArray,
            month: {
                //template for dates in month view
                content: "#=holidayChartHelper.contentTemlapte(data)#"
            },
            navigate: function () {

                
                var current = this.current();
                
                if (AjaxManager.changeFormattedDate(gbDate, "DDMMYYYY") == AjaxManager.changeFormattedDate(current, "DDMMYYYY")) {
                    
                } else {
                    
                    var fromatedDate = AjaxManager.changeFormattedDate(current, "DDMMYYYY");
                    var sqlDateFormat = AjaxManager.changeReverseDateFormat(fromatedDate);
                    $("#calendar1").html("");
                    holidayChartHelper.changeCalender(sqlDateFormat);
                }


            },

            footer: false
        }).width("32em");
    },

    contentTemlapte: function (data) {
        var res = "";
        //gbDate = calenderDate;

        
        
        for (var i = 0; i < data.dates.length; i++) {


            var holidayDateStringFormat = AjaxManager.changeToSQLDateFormat(data.dates[i].HolidayDate, 0).trim();
            var holidayDateDateForMat = new Date(holidayDateStringFormat);
            

            if (holidayDateStringFormat == kendo.toString(data.date, "MM/dd/yyyy")) {
                if (data.dates[i].HolidayType == 1 || data.dates[i].HolidayType == 2) {
                    res = '<div class="h-red" title="'+data.dates[i].Description+'">' + data.date.getDate() + '</div>';
                } else if (data.dates[i].HolidayType == 3 || data.dates[i].HolidayType == 4 || data.dates[i].HolidayType == 5 || data.dates[i].HolidayType == 6) {
                    res = '<div class="h-orange" title="' + data.dates[i].Description + '">' + data.date.getDate() + '</div>';
                }
                else if (data.dates[i].HolidayType == -1) {
                    res = '<div class="h-blue" title="' + data.dates[i].Description + '">' + data.date.getDate() + '</div>';
                }
                else if (data.dates[i].HolidayType == -2) {
                    res = '<div class="h-green" title="' + data.dates[i].Description + '">' + data.date.getDate() + '</div>';
                }
                break;

            } else {
                if (holidayDateDateForMat.getMonth() == data.date.getMonth()) {

                    res = '<div id="div' + data.date.getDate() + holidayDateDateForMat.getMonth() + '" class="")">' + data.date.getDate() + '</div>';
                } else {
                    //res = '<div class="">' + data.date.getDate() + '</div>';
                    res = "";
                }

            }

        }
        if (data.dates.length == 0) {
            if (gbDate.getMonth() == data.date.getMonth()) {
                res = '<div id="div' + data.date.getDate() + gbDate.getMonth() + '" class="" )">' + data.date.getDate() + '</div>';
                //res = "";
            } else {
                //res = '<div class="">' + data.date.getDate() + '</div>';
                res = "";
            }
        }
        return res;
    },

    //GenerateYearCombo: function () {
    //    $("#cmbYear").kendoComboBox({
    //        dataTextField: "text",
    //        dataValueField: "value",
    //        dataSource: [
    //            { text: "2010", value: "2010" },
    //            { text: "2011", value: "2011" },
    //            { text: "2012", value: "2012" },
    //            { text: "2013", value: "2013" },
    //            { text: "2014", value: "2014" },
    //            { text: "2015", value: "2015" },
    //            { text: "2016", value: "2016" },
    //            { text: "2017", value: "2017" },
    //            { text: "2018", value: "2018" },
    //            { text: "2019", value: "2019" },
    //            { text: "2020", value: "2020" }
    //        ],
    //        filter: "contains",
    //        suggest: true
    //    });

    //    var year = new Date().getFullYear();
    //    var yearCombo = $("#cmbYear").data("kendoComboBox");
    //    yearCombo.value(year);
        
    //    $("#cmbYear").parent().css('width', "7.4em");
    //},
    
    //GenerateMonthCombo: function () {
    //    $("#cmbMonth").kendoComboBox({
    //        dataTextField: "text",
    //        dataValueField: "value",
    //        dataSource: [
    //            { text: "January", value: "1" },
    //            { text: "February", value: "2" },
    //            { text: "March", value: "3" },
    //            { text: "April", value: "4" },
    //            { text: "May", value: "5" },
    //            { text: "June", value: "6" },
    //            { text: "July", value: "7" },
    //            { text: "August", value: "8" },
    //            { text: "September", value: "9" },
    //            { text: "October", value: "10" },
    //            { text: "November", value: "11" },
    //            { text: "December", value: "12" }
    //        ],
    //        filter: "contains",
    //        suggest: true,
    //        change: function () {
    //            AjaxManager.isValidItem("cmbMonth", true);
    //        }
    //    });

    //    var month = new Date().getMonth() + 1;
    //    var monthCombo = $("#cmbMonth").data("kendoComboBox");
    //    monthCombo.value(month);
    //    $("#cmbMonth").parent().css('width', "7.4em");
    //    holidayChartManager.LoadHolidayCalender();
    //},
    
    //changeCalenderbyYearAndMonth: function () {
    //    var year = $("#cmbYear").val();
    //    if(!AjaxManager.isDigit(year)) {
    //        alert("Invailid Year");
    //        return false;
    //    }
    //    var month = $("#cmbMonth").val();
    //    if (!AjaxManager.isDigit(month)) {
    //        alert("Invailid month");
    //        return false;
    //    }
    //    holidayChartManager.LoadHolidayCalender();
    //}
    
};