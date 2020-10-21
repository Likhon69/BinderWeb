
var upcomingHolidayManager = {};

var upcomingHolidayHelper = {

    initiateUpcomingHoliday: function () {

        upcomingHolidayHelper.LoadupcomingHoliday();


        $("#btnViewMore").click(function () { upcomingHolidayHelper.ViewMoreForHoliday(); });
        $("#btnViewCalender").click(function () { upcomingHolidayHelper.ViewCalender(); });
        $("#btnBacktopHolidayView").click(function () { upcomingHolidayHelper.BacktopHolidayView(); });
        $("#btndivCalenderViewBack").click(function () { upcomingHolidayHelper.CalenderViewBack(); });

    },

    LoadupcomingHoliday: function () {
        var events = [];
        var empId = CurrentUser.Employee_Id;
        AjaxManager.GetApiData("/api/Employee/GetUpcomingHoliday?empId=" + empId, "", function (data) {

            for (var i = 0; i < data.length; i++) {
                if (i < 4) {
                    var obj = new Object();
                    obj.date = "<span style='font-size:12px;font-weight:bold'>" + kendo.toString(kendo.parseDate(data[i].HolidayDate), "dd") + " " + kendo.toString(kendo.parseDate(data[i].HolidayDate), "MMM") + "</span> <br>" + kendo.toString(kendo.parseDate(data[i].HolidayDate), "dddd");
                    obj.content = data[i].Description;
                    events.push(obj);
                }
            }
            $('#divUpcomingHolidaystop').roadmap(events, {
                eventsPerSlide: 4,
                slide: 1,
                orientation: 'vertical',
               // prevArrow: '<i class="material-icons">keyboard_arrow_left</i>',

               // nextArrow: '<i class="material-icons">keyboard_arrow_right</i>',

                eventTemplate: '<li class="timeline__events__event">' +
                  '<div class="event">' +
                    '<label  class="event__date">####DATE###</label>' +
                    '<label  class="event__content">####CONTENT###</label>' +
                  '</div>' +
                '</li>',
            });

        });




    },

    ViewMoreForHoliday: function () {

        $("#divUpcomingHolidaystopPage").hide();
        $("#divUpcomingHolidaysPageDetails").show();
    },

    ViewCalender: function () {
        $("#divUpcomingHolidaystopPage").hide();
        $("#divCalenderView").show();
    },

    BacktopHolidayView: function () {

        $("#divUpcomingHolidaystopPage").show();
        $("#divUpcomingHolidaysPageDetails").hide();
    },

    CalenderViewBack: function () {
        $("#divUpcomingHolidaystopPage").show();
        $("#divCalenderView").hide();
    },

};