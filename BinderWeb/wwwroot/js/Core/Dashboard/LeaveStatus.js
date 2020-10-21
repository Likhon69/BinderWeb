
var LeaveStatusManager = {
    GetMyLeaveStatusGraph: function () {
        var objdata = "";
        var jsonParam = "";
        var serviceUrl = "../Leave/GetMyLeaveStatusGraph/";
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

var LeaveStatusHelper = {
    //GenerateLeaveStatusChart: function () {
       
    //    var total = 10;
    //    var unitIntervalOf_Y = 5;

       
    //    var sampleData = LeaveStatusManager.GetMyLeaveStatusGraph();
    //    var maxvalue =0;
    //    for (var i = 0; i < sampleData.length; i++) {
    //        maxvalue = sampleData[i].MaxValue > maxvalue ? sampleData[i].MaxValue : maxvalue;
    //    }

        


    //    var settings = {
    //        title: "",//"Fitness & exercise weekly scorecard",
    //        description:"",// "Time spent in vigorous exercise",
    //        padding: { left: 5, top: 5, right: 5, bottom: 5 },
    //        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
    //        source: sampleData,
    //        categoryAxis:
    //            {
    //                dataField: 'LeaveType',
    //                showGridLines: false
    //            },
    //        colorScheme: 'scheme01',
    //        showToolTips: true,
    //        enableAnimations: true,            
    //        seriesGroups:
    //            [
    //                {
    //                    type: 'column',
    //                    showLabels: true,
    //                    columnsGapPercent: 100,
    //                    xseriesGapPercent: 5,
    //                    offsetX: 200,
    //                    valueAxis:
    //                    {
    //                        minValue: 0,
    //                        maxValue: maxvalue,
    //                        unitInterval: 10,
    //                        description: 'Total Leave',
    //                        axisSize: 'auto'
                           
    //                    },
    //                    //mouseover: myEventHandler,
    //                    //mouseout: myEventHandler,
    //                    click: myEventHandler,
    //                    series: [
    //                            { dataField: 'Opening', displayText: 'Opening' },
    //                            { dataField: 'LeaveUsed', displayText: 'Leave Used' },
    //                            { dataField: 'LeaveBalance', displayText: 'Leave Balance' }
    //                    ]
    //                }
    //            ]
    //    };
        
    //    function myEventHandler(e) {
    //        window.location.href = "../Leave.mvc/LeaveApplication";
    //    };
    //    // create the chart
    //    $('#divForGraphForLeaveStatus').jqxChart(settings);
    //    // get the chart's instance
       
    //}

    GenerateLeaveStatusChart: function () {


        var sampleData = LeaveStatusManager.GetMyLeaveStatusGraph();
      
        //var maxvalue = 0;
        //for (var i = 0; i < sampleData.length; i++) {
        //    maxvalue = sampleData[i].MaxValue > maxvalue ? sampleData[i].MaxValue : maxvalue;
        //}
        var chart = AmCharts.makeChart("divForGraphForLeaveStatus", {
            "theme": "none",
            "type": "serial",
            "legend": {
                "useGraphSettings": true
            },
            "dataProvider": sampleData,
            "valueAxes": [{
                "stackType": "3d",
                "unit": "",
                "position": "left",
                "title": "",
            }],
            "startDuration": 1,
            "graphs": [
                {
                    "balloonText": " [[category]] [[title]]: <b>[[value]]</b>",
                    "fillAlphas": 0.9,
                    "lineAlpha": 0.2,
                    "title": "Leave Used",
                    "type": "column",
                    "valueField": "LeaveUsed"
                }, {
                    "balloonText": " [[category]] [[title]]: <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "title": "Leave Balance",
                "type": "column",
                "valueField": "LeaveBalance"
            },
            
            {
                "balloonText": " [[category]] [[title]]: <b>[[value]]</b>",
                "fillAlphas": 0.9,
                "lineAlpha": 0.2,
                "title": "Opening",
                "type": "column",
                "valueField": "Opening"
            }],
            "plotAreaFillAlphas": 0.1,
            "depth3D": 60,
            "angle": 30,
            "categoryField": "LeaveType",
            "categoryAxis": {
                "gridPosition": "start"
            },
            
            "exportConfig": {
                "menuTop": "20px",
                "menuRight": "20px",
                "menuItems": [{
                    "icon": '/lib/3/images/export.png',
                    "format": 'png'
                }]
            }
        });
        jQuery('.chart-input').off().on('input change', function () {
            var property = jQuery(this).data('property');
            var target = chart;
            chart.startDuration = 0;

            if (property == 'topRadius') {
                target = chart.graphs[0];
                if (this.value == 0) {
                    this.value = undefined;
                }
            }

            target[property] = this.value;
            chart.validateNow();
        });
        //commonChartConfigHelper.StackedAndClusteredColumnChart("divForGraphForLeaveStatus",sampleData);


        
        //$('#divForGraphForLeaveStatus').jqxChart(settings);
        // get the chart's instance

    }

};