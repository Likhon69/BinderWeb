
var todaysAttendanceManager = {
    GenerateShiftComboByCompany: function (companyId) {
        var objShift = "";
        var jsonParam = "companyId=" + companyId;
        var serviceUrl = "../Calender/GenerateShiftComboByCompany/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objShift = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return objShift;
    },

    GenerateTodaysData: function (shiftId) {
        var objdata = "";
        var jsonParam = "shiftId=" + shiftId;
        var serviceUrl = "../Dashboard/GetTodaysAttendanceGraph/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            objdata = jsonData;
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                        [{
                            addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                                $noty.close();
                            }
                        }]);
        }
        return objdata;
    },
};

var todaysAttendanceHelper = {
    GetShiftInformationByCompanyId: function () {
        var companyId = 0;
        if (CurrentUser != null) {
            companyId = CurrentUser.CompanyId;
        }
        var objShift = new Object();

        objShift = todaysAttendanceManager.GenerateShiftComboByCompany(companyId);

        $("#cmbShift").kendoComboBox({
            placeholder: "Select Shift Name",
            dataTextField: "ShiftName",
            dataValueField: "ShiftId",
            dataSource: objShift
        });

        var cmbShift = $("#cmbShift").data("kendoComboBox");
        if (CurrentUser != null) {
            cmbShift.value(CurrentUser.ShiftId);
        }
    },

    GenerateTodaysAttendanceChart: function () {

        
        var data = todaysAttendanceManager.GenerateTodaysData();

        var source =
        {
            localdata: data,
            datafields: [
            { name: 'label' },
            { name: 'data' },
            { name: 'dataWithLabel' },
            { name: 'color' }
            ],
        };
        var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + '" : ' + error); } });


        var settings = {
            title: null,
            description: null,
            enableAnimations: true,
            showLegend: true,
            source: dataAdapter,
            colorScheme: 'scheme12',


            seriesGroups:
            [
            {
                type: 'pie',
                showLabels: true,
                showToolTips: false,
                useGradient: true,
                series:
                [
                {
                    dataField: 'data',
                    displayText: 'dataWithLabel',
                    color: 'color',
                    labelRadius: 100,
                    initialAngle: 0,
                    radius: 70,
                    centerOffset: 5
                }

                ]
            }
            ],


        };
        $("#chartTodaysAttendance").jqxChart(settings);
        var myChart = $('#chartTodaysAttendance').jqxChart(settings);
        myChart.jqxChart({ showToolTips: false });
        myChart.jqxChart('addColorScheme', 'scheme12', ["#FFAE00", "#8EBC00", "#B20000", "#014E18", "#a1caf1", "#0000FF"]);
        myChart.jqxChart('colorScheme', 'scheme12');
        myChart.jqxChart('refresh');

    },

    GenerateTodaysAttendanceAmChart: function () {

        var shiftId = $("#cmbShift").val();
        if (shiftId == "") {
            shiftId = 0;
        }

        var data = todaysAttendanceManager.GenerateTodaysData(shiftId);
        
        var chart = AmCharts.makeChart("chartTodaysAttendance", {
            "type": "pie",
            "theme": "none",
            "dataProvider": data,
            "valueField": "data",
            "titleField": "label",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30,
            "exportConfig": {
                menuItems: [{
                    icon: '/lib/3/images/export.png',
                    format: 'png'
                }]
            }
        });
        jQuery('.chart-input').off().on('input change', function () {
            var property = jQuery(this).data('property');
            var target = chart;
            var value = Number(this.value);
            chart.startDuration = 0;

            if (property == 'innerRadius') {
                value += "%";
            }

            target[property] = value;
            chart.validateNow();
        });






    },

    changeShiftName: function () {

        var shiftId = $("#cmbShift").val();
        if (AjaxManager.isDigit(shiftId)) {
            //todaysAttendanceHelper.GenerateTodaysAttendanceChart();
            todaysAttendanceHelper.GenerateTodaysAttendanceAmChart();
        }
    }

};



