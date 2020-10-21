var subordinateData = [];
var employeeWellcomeManager = {

    GetOrganogramRepotingBoss: function (employeeId) {

        var obj = "";
        var jsonParam = "employeeId=" + employeeId;
        var serviceUrl = "../Organogram/GetOrganogramTreeDiagramData/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {
            obj = jsonData;
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;

    },

    GetProfileCompletation: function () {

        var obj = "";
        var jsonParam = "";
        var serviceUrl = "../Dashboard/ProfileCompletationStatus/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            obj = jsonData;
            if (jsonData != null) {
                $("#spnProfilePer").html(jsonData + ' %');
            }
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
        return obj;

    },

};

var employeeWellcomeHelper = {

    initiateEmployeeWelCome: function () {
       
        if (CurrentUser != null) {
            var img = '<img class="img-responsive circleImage" id="profilePictureForDashboard" alt="" src="' + CurrentUser.ProfilePicture + '">';
            $("#divImg").html(img);
            $("#spnUserName").html(CurrentUser.UserName);
        }

        AjaxManager.GetApiData("/api/Notification/Greeting", "", function (data) {
            $("#spnDay").html(data);
        });

        employeeWellcomeManager.GetProfileCompletation();

        $("#btnViewMyTeam").click(function () { employeeWellcomeHelper.ViewMyTem(); });
        $("#btnBackWellcome").click(function () { employeeWellcomeHelper.ViewWelcome(); });
        $("#btnViewOrganogram").click(function () { employeeWellcomeHelper.ViewOrgChart(); });


    },

    ViewMyTem: function () {
        subordinateData = null;
        $("#divEmployeeInfo").hide();
        $("#divEmployeeSubOrdinateInfo").show();
        var empId = CurrentUser.Employee_Id;
        AjaxManager.GetApiData("/api/Employee/GetSubOrdinatEmp?empId=" + empId, "", function (data) {

            for (var i = 0; i < data.length; i++) {
               
                //data[i].ProfilePictue = assembly.ApiPath + "/api/Employee/ProfilePhoto?empId=" + data[i].EmployeeId;
                data[i].ProfilePictue = assembly.ApiPath + "/api/Employee/ProfilePhoto?empId=" + data[i].EmployeeId;
                data[i].AltImage = data[i].EmployeeName.trim().substring(0, 1);

            }
            subordinateData = data;
            $("#divDynamicImage").kendoListView({
                dataSource: data,
                template: kendo.template($("#subordinateTmpl").html())
            });

        });



    },

    ViewWelcome: function () {
        $("#divEmployeeInfo").show();
        $("#divEmployeeSubOrdinateInfo").hide();
    },

    ViewOrgChart: function () {
        AjaxManager.initPopupWindow("divEmployeeSubOrdinateOrganogram", "ORG CHART", "90%");
        $("#divEmployeeSubOrdinateOrganogram").data('kendoWindow').open();

        $("#divEmployeeSubOrdinateOrganogram").data("");

        employeeWellcomeHelper.createDiagram("repoting_diagram");
        var empId = CurrentUser.Employee_Id;
        var data = employeeWellcomeManager.GetOrganogramRepotingBoss(empId);
        var dataSource = employeeWellcomeHelper.diagramDataSource(data);
        var diagram = $("#repoting_diagram").data("kendoDiagram");
        diagram.setDataSource(dataSource);
        //diagram.pan(new kendo.dataviz.diagram.Point(-250, 0));

    },

    createDiagram: function (ctlId) {

        $("#" + ctlId).kendoDiagram({
            editable: {
                remove: true,
                rotate: false,
                resize: false,

            },
            pinnable: true,
            autoBind: true,
            undoable: false,

            layout: {
                type: "tree",
                subtype: "right",
                underneathHorizontalOffset: 140,
            },
            shapeDefaults: {
                visual: employeeWellcomeHelper.visualTemplate
            },
            connectionDefaults: {
                endCap: "ArrowEnd",
                stroke: {
                    color: "#979797",
                    width: 2
                },
                hover: {
                    stroke: { color: "red" }
                },
            },
            zoom: 0.7,
            zoomRate: 0.01,
            zoomMin: 0.01,
            zoomMax: 2,
            pdf: {
                allPages: true,
                avoidLinks: true,
                paperSize: "A4",
                margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                landscape: true,
                repeatHeaders: true,
                scale: 0.8
            },
            click: function (e) {
                var selectedItem = e.item;

            },
            remove: function (e) {

                var diagram = e.sender;
                var conn = e.connection;
                var shap = e.shape;
                if (shap != null) {
                    e.preventDefault();
                }

            },
            dataBound: function () {
                var bbox = this.boundingBox();
                this.wrapper.width(bbox.width + bbox.x + 50);
                this.wrapper.height(bbox.height + bbox.y + 50);
                this.resize();
            }

        });

        var diagram = $("#" + ctlId).getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
        diagram.pan(new kendo.dataviz.diagram.Point(0, 0));
        diagram.zoom(0.7);
    },

    visualTemplate: function (options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group({
            autoSize: false
        });
        var dataItem = options.dataItem;

        g.append(new dataviz.diagram.Rectangle({
            width: 450,
            height: 90,
            stroke: {
                width: 1
            },
            fill: {
                color: dataItem.colorScheme,
                //gradient: {
                //    type: "radial",
                //    radius: 1,
                //    stops: [{
                //        color: dataItem.colorScheme,
                //        offset: 0,
                //        opacity: 0
                //    },
                //    {
                //        color: dataItem.colorScheme,
                //        offset: 1,
                //        opacity: 1
                //    }]
                //}
            }
        }));

        var posX = 0;

        //if (dataItem.EmployeeId != null) {
        //    g.append(new dataviz.diagram.TextBlock({
        //        text: dataItem.EmployeeId,
        //        x: 75,
        //        y: 10,
        //        fill: "black",
        //        fontSize: 16,
        //        fontFamily: 'NeoSans'

        //    }));

        //    var txtHeader = "";
        //    if (dataItem.level == 1) {
        //        //txtHeader = "Repoting Boss";
        //        txtHeader = "";
        //    } else if (dataItem.level == 2) {
        //        txtHeader = "";
        //    } else {
        //        //txtHeader = "Sub Ordinate";
        //        txtHeader = "";
        //    }


        //    posX = 180;


        //} else {
        //    txtHeader = dataItem.lastName;

        //    posX = 210;

        //}

        g.append(new dataviz.diagram.TextBlock({
            text: dataItem.firstName + ' (' + dataItem.EmployeeId + ')',
            x: 84,
            y: 5,
            fill: "black",
            fontSize: 15,
            fontFamily: 'Neo Sans Std Medium'

        }));

        var ts = dataItem.title.split(',');
        var psInc = 15;
        for (var i = 0; i < ts.length; i++) {
            g.append(new dataviz.diagram.TextBlock({
                text: ts[i],
                x: 84,
                y: 30 + (i * psInc),
                fill: "black",
                fontFamily: 'Neo Sans Std',
                fontSize: 14
            }));
        }


        //g.append(new dataviz.diagram.TextBlock({
        //    text: txtHeader,
        //    x: posX,
        //    y: 10,
        //    fill: "black",
        //    fontSize: 14,
        //    rotate: 270,
        //    fontFamily: 'NeoSans'


        //}));




        g.append(new dataviz.diagram.Image({
            source: dataItem.image,
            x: 3,
            y: 3,
            width: 75,
            height: 85

        }));

        return g;
    },

    diagramDataSource: function (data) {
        var dataSource = new kendo.data.HierarchicalDataSource({
            data: data,
            schema: {
                model: {
                    children: "items"
                }
            }
        });
        return dataSource;

    },

};

