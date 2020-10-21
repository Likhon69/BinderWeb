

var myAttendanceManager = {
    
    GetMyAttendanceData: function (hrRecordId, month, year) {
    
        var objdata = "";
        var jsonParam = "hrRecordId=" + hrRecordId + "&month=" + month + "&year=" + year;
        var serviceUrl = "../Dashboard/GetMyAttendanceGraph/";
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

var myAttendanceHelper = {
    //GenerateMyAttendanceChart: function (hrRecordId,month,year) {
    //    //var data = [
    //    //    { label: "Leave", data: 10 },
    //    //    { label: "OnSiteClient", data: 20 },
    //    //    { label: "Absent", data: 30 },
    //    //    { label: "Presnt", data: 40 }
    //    //];
        
    //    var data = myAttendanceManager.GetMyAttendanceData(hrRecordId,month,year);

    //    //var options = {
    //    //    series: {
    //    //        pie: {
    //    //            innerRadius: .4,
    //    //            show: true
    //    //        }
    //    //    },
    //    //    legend: {
    //    //        show: false
    //    //    }//,
    //        //grid: {
    //        //    hoverable: true,
    //        //    clickable: true
    //        //}
    //    //};

    //    //$.plot($("#chartMyAttendanceMonth"), data, options);
        
    //    var source =
    //    {
    //        localdata: data,
    //        datafields: [
    //        { name: 'label' },
    //        { name: 'data' },
    //        { name: 'dataWithLabel' },
    //        { name: 'color' }
    //        ],
    //    };
    //    var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + '" : ' + error); } });
    //    // prepare jqxChart settings
        
    //    var settings = {
    //        title: null,
    //        description: null,
    //        enableAnimations: true,
    //        showLegend: true,
    //        source: dataAdapter,
    //        colorScheme: 'scheme12',

    //        seriesGroups:
    //        [
    //        {
    //            type: 'pie',
    //            showLabels: true,
    //            showToolTips: true,
    //            useGradient: true,
    //            series:
    //            [
    //            {
    //                dataField: 'data',
    //                displayText: 'dataWithLabel',
    //                color: 'color',
    //                labelRadius: 100,
    //                initialAngle: 0,
    //                radius: 70,
    //                centerOffset: 5
    //            }

    //            ]
    //        }
    //        ],


    //    };
       
    //    // setup the chart
    //    $("#chartMyAttendanceMonth").jqxChart(settings);

    //    var myChart = $('#chartMyAttendanceMonth').jqxChart(settings);
    //    //myChart.jqxChart({ showToolTips: false });        
    //    myChart.jqxChart('addColorScheme', 'scheme12', ["#FFAE00", "#8EBC00", "#B20000", "#014E18", "#a1caf1"]);
    //    myChart.jqxChart('colorScheme', 'scheme12');
    //    myChart.jqxChart('refresh');

    //},
    GenerateMyAttendanceChart: function (hrRecordId, month, year) {
      
        var data = myAttendanceManager.GetMyAttendanceData(hrRecordId, month, year);
        //var legend = { "markerType": "circle", "position": "bottom", "autoMargins": false };
        commonChartConfigHelper.ThreeDDonutChart("chartMyAttendanceMonth", data, "", "");
        //var legend = { "markerType": "circle", "position": "right", "autoMargins": false };
       // commonChartConfigHelper.ThreeDPieChart("chartTodaysAttendance", data, legend);
      
    },
};