//RecomandationRequest

var recomandationRequestManager = {
    SelectRecommendationRequest: function () {
        var objdata = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/SelectRecommendationRequest/";
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

var recomandationRequestHelper = {
    //GenerateRecomandationRequestChart: function () {
    //            //130 considering as standard for the Hight of Doctor Outlet
    //        //var total = (maximumTotalOfCategory / 130);
    //        //var unitIntervalOf_Y = ((total - (total % 10)) + 10);
    //        ////debugger;
    //        //if (unitIntervalOf_Y == 0) {
    //        //    unitIntervalOf_Y = 10;
    //    //}
    //    var total = 5;
    //    var unitIntervalOf_Y =2;

    //        // prepare chart data as an array
            
    //    //var sampleData = [
    //    //            { Attendance: 3},
    //    //            { Leave: 2},
    //    //            { Coff: 5},
    //    //            { OnSiteClient: 7},
    //    //            {Movement: 4}
    //    //        ];
        
    //    var sampleData = recomandationRequestManager.SelectRecommendationRequest();

    //        // prepare jqxChart settings
    //        var settings = {
    //            title: "",
    //            description: "",
    //            enableAnimations: true,
    //            showLegend: true,
    //            padding: { left: 5, top: 5, right: 5, bottom: 5 },
    //            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
    //            source: sampleData,
    //            categoryAxis:
    //                        {
    //                            text: 'Category Axis',
    //                            textRotationAngle: 0,
    //                            dataField: 'ClassName',
    //                            showTickMarks: true,
    //                            tickMarksInterval: 1,
    //                            tickMarksColor: '#888888',
    //                            unitInterval: 1,
    //                            showGridLines: false,
    //                            gridLinesInterval: 1,
    //                            gridLinesColor: '#888888',
    //                            axisSize: 'auto'
    //                        },
    //            colorScheme: 'scheme05',
    //            seriesGroups:
    //                        [

    //                            {
    //                                //type: 'stackedcolumn',
    //                                type: 'stackedcolumn',
    //                                showLabels: true,
    //                                columnsGapPercent: 100,
    //                                seriesGapPercent: 5,
    //                                offsetX: 200,
    //                                click:myEventHandler,

    //                                valueAxis:
    //                                    {
    //                                        unitInterval: unitIntervalOf_Y,
    //                                        minValue: 0,
    //                                        maxValue: 10,
    //                                        displayValueAxis: true,
    //                                        description: 'Total Pending',
    //                                        axisSize: 'auto',
    //                                        tickMarksColor: '#888888',
    //                                        gridLinesColor: '#777777'
    //                                    },
    //                                series: [
    //                                        { dataField: 'Attendance', displayText: 'Attendance' },
    //                                        { dataField: 'Leave', displayText: 'Leave' },
    //                                        { dataField: 'Coff', displayText: 'Coff' },
    //                                        { dataField: 'OnSiteClient', displayText: 'OnSiteClient' },
    //                                        { dataField: 'Movement', displayText: 'Movement' }
    //                                    ]
    //                            }
    //                        ]
    //        };
    //        function myEventHandler(e) {
    //            var datafield = e.serie.dataField;
                
    //            if(datafield == "Attendance") {
    //                window.location.href = "../AttendanceRequest/AttendanceRequest";
    //            }
    //            else if(datafield == "Leave") {
    //                window.location.href = "../Leave/LeaveApplication";
    //            }
    //            else if (datafield == "OnSiteClient") {
    //                window.location.href = "../OnsiteClient/OnsiteClient";
    //            }
    //            else if(datafield == "Movement") {
    //                window.location.href = "../Movement/Movement";
    //            }
    //            else if(datafield == "Coff") {
    //                window.location.href = "../Coff/CoffSettings";
    //            }
    //            //e.event = click
    //            //e.serie.dataField = "Movement"
    //            //e.elementValue = 5

    //        };
    //        // setup the chart
    //        $('#divForGraph').jqxChart(settings);
    //}
    GenerateRecomandationRequestChart: function () {
       
        var sampleData = recomandationRequestManager.SelectRecommendationRequest();
      
        // prepare AmChart settings
        var chart = AmCharts.makeChart("divForGraph", {
            "theme": "none",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": sampleData,
            "valueAxes": [{
                "position": "left",
                "axisAlpha": 0,
                "gridAlpha": 0
            }],
            "graphs": [{
                "balloonText": "[[category]]",//: <b>[[value]]</b>
                "colorField": "color",
                "fillAlphas": 0.85,
                "lineAlpha": 0.1,
                "type": "column",
                "topRadius": 1,
                "valueField": "data"
            }],
            "depth3D": 40,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": true
            },
            "categoryField": "dataWithLabel",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "gridAlpha": 0
            },
            "exportConfig": {
                "menuTop": "20px",
                "menuRight": "20px",
                "menuItems": [{
                    "icon": '../Scripts/amcharts/images/export.png',
                    "format": 'png'
                }]
            }
        }, 0).addListener("clickGraphItem", function (event) {
       
            if (event.graph.currentDataItem.dataContext.label == "Movement") {
                window.location.href = "../Attendance/Movement";
            } else if (event.graph.currentDataItem.dataContext.label == "Attendance") {
                window.location.href = "../Attendance/AttendanceRequest";
            } else if (event.graph.currentDataItem.dataContext.label == "Leave") {
                window.location.href = "../Leave/LeaveApplication";
            } else if (event.graph.currentDataItem.dataContext.label == "Onsite Client" || event.graph.currentDataItem.dataContext.label == "Outstation") {
                window.location.href = "../Attendance/OnsiteClient";
            } else if (event.graph.currentDataItem.dataContext.label == "Coff" || event.graph.currentDataItem.dataContext.label == "CPL Certificate") {
                window.location.href = "../Leave/CoffSettings";
            }
            else if (event.graph.currentDataItem.dataContext.label == "Day-off") {
                window.location.href = "../Attendance/DayOffInformation";
            }
            chart.validateData();
        });
            

        jQuery('.chart-input').off().on('input change', function () {
            var property = jQuery(this).data('property');
            var target = chart;
            chart.startDuration = 0;

            if (property == 'topRadius') {
                target = chart.graphs[0];
            }

            target[property] = this.value;
            chart.validateNow();
        });
        //function myEventHandler(e) {
        //    var datafield = e.serie.dataField;

        //    if (datafield == "Attendance") {
        //        window.location.href = "../AttendanceRequest/AttendanceRequest";
        //    }
        //    else if (datafield == "Leave") {
        //        window.location.href = "../Leave/LeaveApplication";
        //    }
        //    else if (datafield == "OnSiteClient") {
        //        window.location.href = "../OnsiteClient/OnsiteClient";
        //    }
        //    else if (datafield == "Movement") {
        //        window.location.href = "../Movement/Movement";
        //    }
        //    else if (datafield == "Coff") {
        //        window.location.href = "../Coff/CoffSettings";
        //    }
        //    //e.event = click
        //    //e.serie.dataField = "Movement"
        //    //e.elementValue = 5

        //};
        // setup the chart
       // $('#divForGraph').jqxChart(settings);
    }
};