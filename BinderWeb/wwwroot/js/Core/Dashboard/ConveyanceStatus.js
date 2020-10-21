
var ConveyanceStatusManager = {
    
    GetConveyanceGraph: function () {
        var objdata = "";
        var jsonParam = "";
        var serviceUrl = "../Conveyance/GetConveyanceGraph/";
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

var ConveyanceStatusHelper = {
    
    //GenerateLeaveStatusChart: function () {
    //    //130 considering as standard for the Hight of Doctor Outlet
    //    //var total = (maximumTotalOfCategory / 130);
    //    //var unitIntervalOf_Y = ((total - (total % 10)) + 10);
    //    ////debugger;
    //    //if (unitIntervalOf_Y == 0) {
    //    //    unitIntervalOf_Y = 10;
    //    //}
    //    var total = 1000;
    //    var unitIntervalOf_Y = 300;
    //    var sampleData = ConveyanceStatusManager.GetConveyanceGraph();
    //    //debugger;
    //    // prepare chart data as an array

    //    //var sampleData = [
    //    //            { Day: 'Jan', TotalSubmited: 500, Approved: 500, Paid: 400, UnPaid: 100 },
    //    //            { Day: 'Feb', TotalSubmited: 400, Approved: 100, Paid: 100, UnPaid: 0},
    //    //            { Day: 'Mar', TotalSubmited: 700, Approved: 400, Paid: 200, UnPaid: 200 },
    //    //            { Day: 'Apr', TotalSubmited: 900, Approved: 600, Paid: 500, UnPaid: 100 },
    //    //            { Day: 'May', TotalSubmited: 1200, Approved: 700, Paid: 300, UnPaid: 400 },
    //    //            { Day: 'Jun', TotalSubmited: 1000, Approved: 800, Paid: 400, UnPaid: 400 },
    //    //            { Day: 'Jul', TotalSubmited: 300, Approved: 200, Paid: 200, UnPaid: 0 },
    //    //            { Day: 'Aug', TotalSubmited: 200, Approved: 200, Paid: 100, UnPaid: 100 },
    //    //            { Day: 'Sep'},
    //    //            { Day: 'Oct'},
    //    //            { Day: 'Nov'},
    //    //            { Day: 'Dec'}
    //    //];
    //    // prepare jqxChart settings
    //    var settings = {
    //        title: "",//"MY CONVEYANCE STATUS",
    //        description: "",
    //        enableAnimations: true,
    //        showLegend: true,
    //        padding: { left: 5, top: 5, right: 5, bottom: 5 },
    //        titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
    //        source: sampleData,
    //        categoryAxis:
    //                    {
    //                        text: 'Category Axis',
    //                        textRotationAngle: 0,
    //                        dataField: 'Day',
    //                        showTickMarks: true,
    //                        tickMarksInterval: 1,
    //                        tickMarksColor: '#888888',
    //                        unitInterval: 1,
    //                        showGridLines: true,
    //                        gridLinesInterval: 1,
    //                        gridLinesColor: '#888888',
    //                        axisSize: 'auto'
    //                    },
    //        colorScheme: 'scheme05',
    //        seriesGroups:
    //                    [

    //                        {
    //                            //type: 'stackedcolumn',
    //                            type: 'stackedcolumn',
                                
    //                            showLabels: true,
    //                            columnsGapPercent: 50,
    //                            xseriesGapPercent: 5,
    //                            offsetX: 100,

    //                            valueAxis:
    //                                {
    //                                    unitInterval: unitIntervalOf_Y,
    //                                    minValue: 0,
    //                                    maxValue: 10,
    //                                    displayValueAxis: true,
    //                                    description: 'Total Amount',
    //                                    axisSize: 'auto',
    //                                    tickMarksColor: '#888888',
    //                                    gridLinesColor: '#777777'
    //                                },
    //                            series: [
    //                                //{ dataField: 'TotalSubmited', displayText: 'Submited' },
    //                                { dataField: 'Approved', displayText: 'Approved' },
    //                                { dataField: 'Paid', displayText: 'Paid' },
    //                                { dataField: 'UnPaid', displayText: 'UnPaid' }
    //                            ]
    //                        }
    //                    ]
    //    };
    //    // setup the chart
    //    $('#divForGraphForConveyanceStatus').jqxChart(settings);
    //}
    
    GenerateLeaveStatusChart: function () {
      
        var sampleData = ConveyanceStatusManager.GetConveyanceGraph();
     
        
        var chart = AmCharts.makeChart("divForGraphForConveyanceStatus", {
            "type": "serial",
            "theme": "none",
            "pathToImages": "http://www.amcharts.com/lib/3/images/",
            "legend": {
                "useGraphSettings": true
            },
            "dataProvider": sampleData,
            "valueAxes": [{
                "id": "g1",
                "logarithmic": false,
                "dashLength": 1,
                "guides": [{
                    "dashLength": 6,
                    "inside": true,
                    "label": "average",
                    "lineAlpha": 1,
                    "value": 250.4
                }],
                "position": "left"
            }, {
                "id": "g2",
                "logarithmic": false,
                "dashLength": 1,
                "guides": [{
                    "dashLength": 6,
                    "inside": true,
                    "label": "average",
                    "lineAlpha": 1,
                    "value": 250.4
                }],
                "position": "left"
            }],
            "graphs": [{
                "balloonText": "Total Submited : [[value]]",
                "bullet": "round",
                "id": "g1",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 7,
                "lineThickness": 2,
                "title": "Total Submited",
                "type": "smoothedLine",
                "useLineColorForBulletBorder": true,
                "valueField": "TotalSubmited"
            },
            {
                "balloonText": "Approved : [[value]]",
                "bullet": "round",
                "id": "g2",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 7,
                "lineThickness": 2,
                "title": "Approved",
                "type": "smoothedLine",
                "useLineColorForBulletBorder": true,
                "valueField": "Approved"
            },
            {
                "balloonText": "Paid : [[value]]",
                "bullet": "round",
                "id": "g3",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 7,
                "lineThickness": 2,
                "title": "Paid",
                "type": "smoothedLine",
                "useLineColorForBulletBorder": true,
                "valueField": "Paid"
            },
            {
                "balloonText": "Unpaid : [[value]]",
                "bullet": "round",
                "id": "g4",
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "bulletSize": 7,
                "lineThickness": 2,
                "title": "UnPaid",
                "type": "smoothedLine",
                "useLineColorForBulletBorder": true,
                "valueField": "UnPaid"
            }],
            "chartScrollbar": {},
            "chartCursor": {
                "cursorPosition": "mouse"
            },
            "dataDateFormat": "YYYY-MM-DD",
            "categoryField": "Day",
            "categoryAxis": {
                "parseDates": false
            }
        });
        //var chart = AmCharts.makeChart("divForGraphForConveyanceStatus", {
        //    "type": "serial",
        //    "theme": "none",
        //    "pathToImages": "http://www.amcharts.com/lib/3/images/",
        //    "dataProvider": sampleData,
        //    "valueAxes": [{
        //        "id": "g1",
        //        "logarithmic": true,
        //        "dashLength": 1,

        //        "guides": [{
        //            "dashLength": 6,
        //            "inside": true,
        //            "label": "average",
        //            "lineAlpha": 1,
        //            "value": 60.4
        //        }],
        //        "position": "left"
        //    },
                
        //     {
        //         "id": "g2",
        //         "logarithmic": true,
        //         "dashLength": 1,
        //         "guides": [{
        //             "dashLength": 6,
        //             "inside": true,
        //             "label": "average",
        //             "lineAlpha": 1,
        //             "value": 70.4
        //         }],
        //         "position": "left"
        //     },
        //         {
        //             "id": "g3",
        //             "logarithmic": true,
        //             "dashLength": 1,
        //             "guides": [{
        //                 "dashLength": 6,
        //                 "inside": true,
        //                 "label": "average",
        //                 "lineAlpha": 1,
        //                 "value": 70.4
        //             }],
        //             "position": "left"
        //         },
        //         {
        //             "id": "g4",
        //             "logarithmic": true,
        //             "dashLength": 1,
        //             "guides": [{
        //                 "dashLength": 6,
        //                 "inside": true,
        //                 "label": "average",
        //                 "lineAlpha": 1,
        //                 "value": 70.4
        //             }],
        //             "position": "left"
        //         }
        //    ],
        //    "graphs": [{
        //        "valueAxis": "g1",
        //        "bullet": "round",
        //        "id": "g1",
        //        "bulletBorderAlpha": 1,
        //        "bulletColor": "#FFFFFF",
        //        "bulletSize": 7,
        //        "lineThickness": 2,
        //        "title": "Total Submited",
        //        "type": "smoothedLine",
        //        "useLineColorForBulletBorder": true,
        //        "valueField": "TotalSubmited"
        //    },
        //      {
        //        "valueAxis": "g2",
        //        "bullet": "round",
        //        "id": "g2",
        //        "bulletBorderAlpha": 1,
        //        "bulletColor": "#FFFFFF",
        //        "bulletSize": 7,
        //        "lineThickness": 2,
        //        "title": "Approved",
        //        "type": "smoothedLine",
        //        "useLineColorForBulletBorder": true,
        //        "valueField": "Approved"
        //      },
        //    {
        //        "valueAxis": "g3",
        //        "bullet": "round",
        //        "id": "g3",
        //        "bulletBorderAlpha": 1,
        //        "bulletColor": "#FFFFFF",
        //        "bulletSize": 7,
        //        "lineThickness": 2,
        //        "title": "Paid",
        //        "type": "smoothedLine",
        //        "useLineColorForBulletBorder": true,
        //        "valueField": "Paid"
        //    },
        //     {
        //         "valueAxis": "g4",
        //         "bullet": "round",
        //         "id": "g4",
        //         "bulletBorderAlpha": 1,
        //         "bulletColor": "#FFFFFF",
        //         "bulletSize": 7,
        //         "lineThickness": 2,
        //         "title": "UnPaid",
        //         "type": "smoothedLine",
        //         "useLineColorForBulletBorder": true,
        //         "valueField": "UnPaid"
        //     }],
        //    "chartScrollbar": {},
        //    "chartCursor": {
        //        "cursorPosition": "mouse"
        //    },
        //    "dataDateFormat": "YYYY-MM-DD",
        //    "categoryField": "Day",
        //    "categoryAxis": {
        //        "parseDates": true
        //    }
        //});

        //    var chart = AmCharts.makeChart("divForGraphForConveyanceStatus", {
        //    "type": "serial",
        //    "theme": "none",
        //    "legend": {
        //        "autoMargins": true,
        //        "borderAlpha": 0.2,
        //        "equalWidths": false,
        //        "horizontalGap": 10,
        //        "markerSize": 10,
        //        "useGraphSettings": true,
        //        "valueAlign": "left",
        //        "valueWidth": 0
        //    },
        //    "dataProvider": sampleData,
        //    "valueAxes": [{
        //        "stackType": "100%",
        //        "axisAlpha": 0,
        //        "gridAlpha": 0,
        //        "labelsEnabled": false,
        //        "position": "left"
        //    }],
        //    "graphs": [{
        //        "balloonText": "[[category]],  [[title]]<br><span style='font-size:14px;'><b>[[value]]</b> </span>",
        //        "fillAlphas": 0.9,
        //        "fontSize": 11,
        //        "labelText": "[[value]]",
        //        "lineAlpha": 0.5,
        //        "title": "TotalSubmited",
        //        "type": "column",
        //        "valueField": "TotalSubmited"
        //    }, {
        //        "balloonText": "[[category]],  [[title]]<br><span style='font-size:14px;'><b>[[value]]</b> </span>",
        //        "fillAlphas": 0.9,
        //        "fontSize": 11,
        //        "labelText": "[[value]]",
        //        "lineAlpha": 0.5,
        //        "title": "Approved",
        //        "type": "column",
        //        "valueField": "Approved"
        //    }, {
        //        "balloonText": "[[category]],  [[title]]<br><span style='font-size:14px;'><b>[[value]]</b> </span>",
        //        "fillAlphas": 0.9,
        //        "fontSize": 11,
        //        "labelText": "[[value]]",
        //        "lineAlpha": 0.5,
        //        "title": "UnPaid",
        //        "type": "column",
        //        "valueField": "UnPaid"
        //    }, {
        //        "balloonText": "[[category]],  [[title]]<br><span style='font-size:14px;'><b>[[value]]</b> </span>",
        //        "fillAlphas": 0.9,
        //        "fontSize": 11,
        //        "labelText": "[[value]]",
        //        "lineAlpha": 0.5,
        //        "title": "Paid",
        //        "type": "column",
        //        "valueField": "Paid"
        //    }],
        //    "marginTop": 30,
        //    "marginRight": 0,
        //    "marginLeft": 0,
        //    "marginBottom": 40,
        //    "autoMargins": false,
        //    "categoryField": "Day",
        //    "categoryAxis": {
        //        "gridPosition": "start",
        //        "axisAlpha": 0,
        //        "gridAlpha": 0
        //    }
        //});
    },
        
        //$('#divForGraphForConveyanceStatus').jqxChart(settings);
    

};