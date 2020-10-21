﻿/// <reference path="../../jquery-1.7.1.min.js" />
/// <reference path="postify.js" />
/// <reference path="../../json2.js" />
/// <reference path="../../../UIFramework/MessageBox/js/noty/jquery.noty.js" />
/// <reference path="~/Scripts/eAzolution/Common/CommonMessage.js" />
var reportServerAPI = "http://localhost:5724/";
var coreApi = "http://localhost:2738/api";
var binderApi = "http://localhost:2735/api";

var customFilterManu = {
    extra: true,
    operators: {
        string: {
            contains: "Contains",
            startswith: "Starts with",
            eq: "Is equal to",
            neq: "Is not equal to"
        }
    }
}

var LoggedInUserName = '';
var serviceRoot = "..";
var CurrentUser = null;




var AjaxManager = {

    GetDataSource: function (serviceUrl, jsonParams) {
        var objResult = new Object();
        $.ajax({
            type: "GET",
            async: false,
            cache: false,
            url: serviceUrl + '?access_token=' + sessionStorage.getItem("token"),
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (jsonResult) {
                objResult = jsonResult;
            },
            error: function (error) {
                window.alert(error.statusText);
            }
        });

        return objResult;
    },

    getMultiDateFormat: function () {
        return ['dd.MM.yyyy', 'dd.MM.yy', 'dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy/MM/dd', 'dd-MM-yyyy', 'MM-dd-yyyy', 'yyyy-MM-dd', 'dd/MM/yy', 'ddMMyyyy', 'ddMMyy'];

    },

    getMultiMonthFormat: function () {
        return ['MM.yyyy', 'MMM yyyy', 'MMM yy', 'MMyyyy', 'MMMyyyy', 'MMyy', 'MMMyy'];

    },

    isValidDate: function (ctrlId) {
        var res = false;
        var dateTo = $("#" + ctrlId).val();
        if (!AjaxManager.isDate(dateTo)) {
            AjaxManager.MsgBox('warning', 'center', 'Invalid Date', 'Invalid Date. e.g.: MM/dd/yyyy', [{
                addClass: 'btn btn-primary',
                text: 'Ok',
                onClick: function ($noty) {
                    $noty.close();
                    $("#" + ctrlId).val('');
                    $("#" + ctrlId).focus();
                }
            }
            ]);
            res = false;
        } else {
            res = true;
        }
        return res;
    },


    //MVC call
    GetJsonResult: function (serviceUrl, jsonParams, isAsync, isCache, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            async: isAsync,
            cache: isCache,
            url: serviceUrl +'?access_token=' + sessionStorage.getItem("token"),
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        });
    },

    GetAsyncData: function (serviceUrl, jsonParams, successCallback) {
        $.ajax({
            type: "GET",
            async: true,
            cache: true,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: function (error) {
                Message.Error(error.statusText);
            }
        });
    },
    GetApiData: function (serviceUrl, jsonParams, successCallback) {

        //   var apiPath = assembly.ApiPath;


        $.ajax({
            type: "GET",
            async: false,
            cache: false,
            //headers: {
            //    "accept": "application/json",
            //    "content-type": "application/json; charset=utf-8"
            //},
            url: serviceUrl + '?access_token=' + sessionStorage.getItem("token"),
            data: jsonParams,
            //beforeSend: function (request) {
            //    request.setRequestHeader("Authorization",
            //        "bearer " + sessionStorage.getItem("token"));
            //},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: successCallback,
            error: function (error) {
                // console.log(res);
                Message.Error(error.statusText);
                //Message.Error(error.statusText);
                //console.log(error.statusText);
            }
        });
    },

    GetJsonResults: function (serviceUrl, jsonParams) {
        var obj = new Object();
        $.ajax({
            type: "GET",
            async: false,
            cache: false,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (jsonData) {
                obj = jsonData;
            },
            error: function () {
                alert("Internal Server Error");
            }


        });
        return obj;
    },

    GetSingleObject: function (serviceUrl, jsonParams) {
        var rvObj = new Object();
        $.ajax({
            type: "GET",
            async: false,
            cache: false,
            url: serviceUrl,
            data: jsonParams,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (jsonData) {
                rvObj = jsonData;
            },
            error: function (error) {
                Message.Error(error.statusText);
            },
        });

        return rvObj;
    },

    GetJson: function (serviceUrl, jsonParams, successCallback, errorCallback) {
        jQuery.ajax({
            url: serviceUrl,
            data: jsonParams,
            type: "POST",
            processData: true,
            contentType: "application/json",
            dataType: "json",
            success: successCallback,
            error: errorCallback
        });
    },

    SendJson: function (serviceUrl, jsonParams, successCallback, errorCallback) {
        jQuery.ajax({
            url: serviceUrl,
            data: jsonParams,
            async: false,
            cache: false,
            type: "POST",
            success: successCallback,
            error: errorCallback
        });
    },


    SaveObject: function (serviceUrl, jsonParams, successCallback) {
        jQuery.ajax({
            url: serviceUrl,
            async: false,
            type: "POST",
            data: "{" + jsonParams + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: successCallback,
            error: function () {
                Message.Error("Internal Server Error");

            }
        });
    },

    SendJson2: function (serviceUrl, jsonParams, successCallback, errorCallback) {

        jQuery.ajax({
            url: serviceUrl,
            async: false,
            type: "POST",
            data: "{" + jsonParams + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: successCallback,
            error: errorCallback
        });
    },

    Post: function (serviceUrl, data, successCallback, errorCallback) {

        jQuery.ajax({
            url: serviceUrl,
            async: false,
            type: "POST",
            data: JSON.stringify(data),
            //dataType: "json",
            contentType: "application/json",
            success: successCallback,
            error: errorCallback
        });
    },

    GetReport: function (serviceUrl, jsonParams, errorCallback) {
        //  //debugger;
        jQuery.ajax({
            url: serviceUrl,
            async: false,
            type: "POST",
            data: "{" + jsonParams + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                window.open('../Reports/ReportViewer.aspx', '_blank');
                //window.open("../Reports/ReportViewer.aspx", 'mywindow', 'fullscreen=yes, scrollbars=auto',);
            },
            error: errorCallback
        });

    },

    SendReportServer: function (serviceUrl, jsonParams) {

        jQuery.ajax({
            url: reportServerAPI + serviceUrl,
            type: "POST",
            data: jsonParams,
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                var url = reportServerAPI + "API/HRDocumentReport/GetPdf?fileName=" + data;

                window.open(url, '_blank');
                //window.open("../Reports/ReportViewer.aspx", 'mywindow', 'fullscreen=yes, scrollbars=auto',);
            },
            error: function (error, sts, xrs) {
                //debugger;
                Message.Warning("Not Found");
            }
        });
    },

    GetString: function (serviceUrl, jsonParams, onSucess) {

        jQuery.ajax({
            url: serviceUrl,
            async: false,
            type: "POST",
            data: "{" + jsonParams + "}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: onSucess,
            error: function (error) {
                Message.Error(error.statusText);

            }
        });

    },

    Export: function (serviceUrl, jsonParams) {

        //  var jsonParam = 'param:' + JSON.stringify(finalSubmitedParam) + ',reportId:' + reportId;
        $.blockUI({
            message: $('#divBlockMessage'),
            onBlock: function () {
                AjaxManager.SendJson2(serviceUrl, jsonParams, function (result) {

                    $.unblockUI();
                    //    window.open(result,'_blank');
                    window.open(result, '_self');


                }, function () {
                    $.unblockUI();
                });
            }
        });
    },

    Export1: function (serviceUrl, jsonParams) {

        //  var jsonParam = 'param:' + JSON.stringify(finalSubmitedParam) + ',reportId:' + reportId;
        $.blockUI({
            message: $('#divBlockMessage'),
            onBlock: function () {
                AjaxManager.SendJson(serviceUrl, jsonParams, function (result) {

                    $.unblockUI();
                    window.open(result, '_self');


                }, function () {
                    $.unblockUI();
                });
            }
        });
    },


    MsgBox: function (messageBoxType, displayPosition, messageBoxHeaderText, messageText, buttonsArray) {
        var n = noty({
            textHeader: messageBoxHeaderText,
            text: messageText,
            type: messageBoxType,
            modal: true,
            dismissQueue: true,
            layout: displayPosition,
            theme: 'defaultTheme',
            buttons: buttonsArray
            //buttons: [
            //  {
            //      addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
            //          $noty.close();
            //         // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Ok" button', type: 'success' });
            //      }
            //  },
            //  {
            //      addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
            //          $noty.close();
            //         // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Cancel" button', type: 'error' });
            //      }
            //  },
            //    {
            //        addClass: 'btn btn-danger', text: 'Test', onClick: function ($noty) {
            //            $noty.close();
            //            // noty({ dismissQueue: false, force: false, layout: layout, theme: 'defaultTheme', text: 'You clicked "Cancel" button', type: 'error' });
            //        }
            //    }
            //]
        });
        $(".btn-primary").focus();
        //console.log('html: ' + n.options.id);
    },




    getGridConfig: function (opt, urllink, sortColumnName, orderBy) {

        return $.extend(true, {
            url: urllink,
            datatype: 'json',
            mtype: 'GET',
            pager: jQuery('#pager'),
            rowNum: 10,
            rowList: [5, 10, 15, 20, 50, 100],
            sortname: sortColumnName,
            sortorder: orderBy, //"DESC" OR ASC,
            viewrecords: true,
            jsonReader: {
                root: "Data",
                page: "PageIndex",
                total: "TotalPages",
                records: "TotalCount",
                repeatitems: false
            },
            loadBeforeSend: function (xhr) {
                xhr.setRequestHeader("content-type", "application/json");
            },
            prmNames: { page: 'pageIndex', rows: 'pageSize', sort: 'orderByField', order: 'orderByType' },
            height: 'auto'
        }, opt);
    },

    multilineGridColumn: function (el, cellval, opts) {
        $(el).attr('style', 'white-space: normal;');
        $(el).html(cellval);
        //return 'style="white-space: normal;'
    },

    disablePopup: function (popupDivName, backgroundDivName) {
        $(popupDivName).fadeOut("slow");
        $(backgroundDivName).fadeOut("slow");
    },

    centerPopup: function (popupDivName) {
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = $(popupDivName).height();
        var popupHeight = popupHeight;
        var popupWidth = $(popupDivName).width();

        $(popupDivName).css({
            "position": "absolute",
            "top": windowHeight / 2 - popupHeight / 2,
            "left": windowWidth / 2 - popupWidth / 2,
            "height": popupHeight
        });

        $('#backgroundPopup').css({
            "height": windowHeight
        });

    },

    PopupWindow: function (ctrId, title, width) {

        $("#" + ctrId).kendoWindow({

            title: title,
            resizeable: false,
            width: width,
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false

        });
        $("#" + ctrId).data("kendoWindow").open().center();

    },

    initPopupWindow: function (ctrId, title, width) {

        $("#" + ctrId).kendoWindow({
            position: {
                top: 0, // or "100px"
                left: "10%",
                right: "10%"
            },
            title: title,
            resizeable: false,
            width: width,
            actions: ["Pin", "Refresh", "Maximize", "Close"],
            modal: true,
            visible: false,
            //minHeight: '80%',
        });
    },

    showlink: function (el, cellval, opts) {
        var op = { baseLinkUrl: opts.baseLinkUrl, showAction: opts.showAction, addParam: opts.addParam };
        if (!isUndefined(opts.colModel.formatoptions)) {
            op = $.extend({}, op, opts.colModel.formatoptions);
        }
        idUrl = op.baseLinkUrl + op.showAction + '?id=' + opts.rowId + op.addParam;
        if (isString(cellval)) {	//add this one even if its blank string
            $(el).html("<a class=\"aColumn\" href=\"#\"" + "onclick=\"Page.Test(' " + opts.rowId + "')\">" + cellval + "</a>");
        } else {
            $.fn.fmatter.defaultFormat(el, cellval);
        }
    },

    jqGridDate: function (el, cellval, opts) {
        if (!isEmpty(cellval) && cellval != "/Date(-62135596800000)/")
            $(el).html(AjaxManager.changeDateFormat(cellval, 0));
    },

    jqGridDateTime: function (el, cellval, opts) {

        if (!isEmpty(cellval) && cellval != "/Date(-62135596800000)/")
            $(el).html(AjaxManager.changeDateFormat(cellval, 1));
    },

    changeDateFormat: function (value, isTime) {
        var time = value.replace(/\/Date\(([0-9]*)\)\//, '$1');
        var date = new Date();
        date.setTime(time);
        if (isTime == 0) {
            return (date.getDate().toString().length == 2 ? date.getDate() : '0' + date.getDate()) + '-' + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear();
        }
        else {
            return (date.getDate().toString().length == 2 ? date.getDate() : '0' + date.getDate()) + '-' + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear()
                + '<br> ' + (date.getHours().toString().length == 2 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes().toString().length == 2 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds().toString().length == 2 ? date.getSeconds() : '0' + date.getSeconds());
        }
    },

    getCurrentDateTime: function () {
        var date = new Date();
        var day = (date.getDate().toString().length == 2 ? date.getDate() : '0' + date.getDate()).toString();
        var month = ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)).toString();
        var year = date.getFullYear().toString();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var suffix = "AM";
        if (hours >= 12) {
            suffix = "PM";
            hours = hours - 12;
        }
        if (hours == 0) {
            hours = 12;
        }

        if (minutes < 10)
            minutes = "0" + minutes;
        //var CurrentDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + " " + suffix;
        //var CurrentDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
        var CurrentDateTime = day + "-" + month + "-" + year;
        return CurrentDateTime;
    },

    changeToSQLDateFormat: function (value, isTime) {


        if (value != "/Date(-62135596800000)/") {
            var time = value.replace(/\/Date\(([0-9]*)\)\//, '$1');
            var date = new Date();
            date.setTime(time);
            var dd = (date.getDate().toString().length == 2 ? date.getDate() : '0' + date.getDate()).toString();
            var mm = ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)).toString();
            var yyyy = date.getFullYear().toString();
            var timeformat = "";
            if (isTime == 1) {
                timeformat = (date.getHours().toString().length == 2 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes().toString().length == 2 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds().toString().length == 2 ? date.getSeconds() : '0' + date.getSeconds());
            }
            var sqlFormatedDate = mm + '/' + dd + '/' + yyyy + ' ' + timeformat;
            return sqlFormatedDate;
        }
        else {
            return "";
        }

    },

    changeReverseDateFormat: function (value) {
        dtvalue = value.split('-');
        var datetime = dtvalue[1] + "/" + dtvalue[0] + "/" + dtvalue[2];
        return datetime;
    },

    changeFormattedDate: function (value, format) {
        var date = new Date(value);
        if (format == "DDMMYYYY") {
            var val = (date.getDate().toString().length == 2 ? date.getDate() : '0' + date.getDate()) + '-' + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + date.getFullYear();
            if (val == "0NaN-0NaN-NaN") {
                return "";
            } else {
                return val;
            }
        }
        if (format == "MMDDYYYY") {
            return ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate().toString().length == 2 ? date.getDate() : '0' + date.getDate()) + '-' + date.getFullYear();
        }
    },

    getDayDifference: function (date1, date2) {

        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = new Date(date1).getTime();
        var date2_ms = new Date(date2).getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);

        // Convert back to days and return
        return Math.round(difference_ms / ONE_DAY);

    },

    getMonthDifference: function (date1, date2) {

        // The number of milliseconds in one Month
        var Month_DAY = 1000 * 60 * 60 * 24 * 30;

        // Convert both dates to milliseconds
        var date1_ms = new Date(date1).getTime();
        var date2_ms = new Date(date2).getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);

        // Convert back to days and return
        return Math.round(difference_ms / Month_DAY);

    },

    getYearDifference: function (currentDate, backdate) {

        var ageDifMs = currentDate - backdate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);

    },

    getYearDifferenceWithFloor: function (currentDate, backdate) {

        var ageDifMs = currentDate - backdate.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.floor(ageDate.getUTCFullYear() - 1970);

    },

    hideMasterDetailsForPrint: function () {
        $("#header").hide();
        $("#dynamicmenu").hide();
        $("#divWelcome").hide();
        $("#content").hide();
        $("#main").css({
            "background-color": "#ffffff"
        });
        $("body").css({
            "background-color": "#ffffff"
        });
        $("#footer").hide();
    },

    showMasterDetailsForPrint: function () {
        $("#header").show();
        $("#dynamicmenu").show();
        $("#divWelcome").show();
        $("#content").show();
        $("#main").css({
            "background-color": "#A6D77B"
        });
        $("body").css({
            "background-color": "#A6D77B"
        });
        $("#footer").show();
    },

    daysBetween: function (date1, date2) {

        var d1 = new Date(date1);
        var d2 = new Date(date2);

        date1 = (d1.getMonth() + 1) + '/' + d1.getDate() + '/' + d1.getFullYear();
        date2 = (d2.getMonth() + 1) + '/' + d2.getDate() + '/' + d2.getFullYear();
        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = new Date(date1).getTime();
        var date2_ms = new Date(date2).getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);

        // Convert back to days and return
        return Math.round(difference_ms / ONE_DAY);

    },

    isFloat: function (s) {
        return /^\s*(\d+)?(\.(\d+))?\s*$/.test(s);
    },

    isDate: function (str) {
        if (str != null) {
            var m = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
            return (m) ? true : false;
        }
        return false;

    },

    isDigit: function (s) {
        return /^\s*\d+\s*$/.test(s);
    },

    isEmpty: function (s) {
        return !((s != null) && /^\s*(\S+(\s+\S+)*)\s*$/.test(s));
    },

    checkSpecialCharacters: function (id) {

        var checkString = $("#" + id).val();

        var regex = /[^\w\s&()-]/gi;


        if (checkString != "") {
            if (regex.test(checkString)) {
                AjaxManager.MsgBox('warning', 'center', 'Special Characters:', 'Your search string contains illegal characters.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                            return (false);
                        }
                    }]);

            }
            else {
                return true;
            }
        }

    },

    replaceSingleQoute: function (id) {

        var checkString = $("#" + id).val();
        checkString = checkString.replace(/'/g, "''");
        return checkString;

    },


    validator: function (divId) {

        var validator = divId.kendoValidator().data("kendoValidator"),
            status = $(".status");

        if (validator.validate()) {
            status.text("").addClass("valid");
            return true;
        } else {
            status.text("Oops! There is invalid data in the form.").addClass("invalid");
            return false;
        }
    },

    Trim: function (s) {
        //return s.replace(s,"/^ *(\w+ ?)+ *$/", "");
        return (s.replace(/\s+/g, ' ')).trim();
    },

    isValidItem: function (ctrlId, isClear) {

        var cmbBox = $("#" + ctrlId).data("kendoComboBox");

        if (cmbBox.value() != "" && cmbBox.value() == cmbBox.text()) {
            AjaxManager.MsgBox('warning', 'center', 'Invalid Item:', 'No Item matched with your Input data as like "[' + cmbBox.text() + ']"!', [{
                addClass: 'btn btn-primary',
                text: 'Ok',
                onClick: function ($noty) {
                    $noty.close();
                    //cmbBox.focus();
                    if (isClear)
                        cmbBox.value('');


                }
            }
            ]);
            return false;
        } else {
            return true;
        }
    },

    toTitleCase: function (str) {
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    },

    AmountInWord: function (number) {

        var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];


        if ((number = number.toString()).length > 9) return 'overflow';
        n = ('000000000' + number).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return "";
        var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    },

    GetSingleObject2: function (serviceUrl, jsonParams) {
        var rvObj = new Object();
        $.ajax({
            type: "POST",
            async: false,
            cache: false,
            url: serviceUrl,
            data: "{" + jsonParams + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (jsonData) {
                rvObj = jsonData;
            },
            error: function (error) {
                Message.Error(error.statusText);
            },
        });

        return rvObj;
    }

};                       //End AjaxManager

var MenuManager = {

    getMenu: function (moduleId) {
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = "../Menu/SelectMenuByUserPermission/";
        var jsonParam = "";// "moduleId=" + moduleId;
        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            //MenuManager.populateMenus(jsonData);
        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    getCurrentUser: function (menuRefresh) {
        var jsonParam = '';
        //var pathName = window.location.pathname;
        //var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = "../Home/GetCurrentUser";
        //if (pageName.toLowerCase() == "home.mvc") {
        //    serviceURL = "./Home/GetCurrentUser";
        //}
        //else {
        //    serviceURL = "./GetCurrentUser";
        //}
        AjaxManager.SendJson2(serviceURL, jsonParam, onSuccess, onFailed);
        function onSuccess(jsonData) {
            CurrentUser = jsonData;
            if (CurrentUser != undefined) {
                if (menuRefresh == true) {
                    MenuManager.getMenu(1);
                }

                $("#headerLogo").attr('style', 'background-image: url("' + CurrentUser.FullLogoPath + '") !important');
            }

        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    getCurrentEmployee: function () {
        var jsonParam = '';
        var serviceURL = "../Home/GetCurrentEmployee";
        return AjaxManager.GetSingleObject(serviceURL, jsonParam);

    },



    IsStringEmpty: function (str) {
        if (str && str != '')
            return false;
        else
            return true;
    },



    addchiledMenu: function (objMenuOrginal, menuId, objMenuList) {
        var chiledMenuArray = [];
        var newMenuArray = [];
        for (var j = 0; j < objMenuList.length; j++) {
            if (objMenuList[j].ParentMenuId == menuId) {
                var objMenu = new Object();
                objMenu = objMenuOrginal;
                var objChiledMenu = new Object();
                objChiledMenu.id = objMenuList[j].MenuId;
                objChiledMenu.itemId = objMenuList[j].MenuId;
                objChiledMenu.text = objMenuList[j].MenuName;
                if (objMenuList[j].MenuPath == "") {
                    objMenu.url = "";
                }
                else {
                    objMenu.url = objMenuList[j].MenuPath;
                }
                objChiledMenu.spriteCssClass = "html";
                chiledMenuArray = objMenuOrginal.items;
                if (chiledMenuArray == undefined || chiledMenuArray.length == 0) {
                    chiledMenuArray = [];
                }
                else {
                    objChiledMenu.expanded = true,
                        objChiledMenu.spriteCssClass = "folder";
                }
                newMenuArray = MenuManager.chiledMenu(objChiledMenu, objMenuList[j].MenuId, objMenuList);
                chiledMenuArray.push(objChiledMenu);
                objMenu.items = chiledMenuArray;
            }
        }
        return chiledMenuArray;
    }

};

var currencyConverter = {

    add_commas: function (nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },

    digitToWordConverter: function (junkVal) {
        junkVal = Math.floor(junkVal);
        var obStr = new String(junkVal);
        numReversed = obStr.split("");
        actnumber = numReversed.reverse();

        if (Number(junkVal) >= 0) {
            //do nothing
        }
        else {
            alert('wrong Number cannot be converted');
            return false;
        }
        if (Number(junkVal) == 0) {
            document.getElementById('container').innerHTML = obStr + '' + 'Rupees Zero Only';
            return false;
        }
        if (actnumber.length > 9) {
            alert('Oops!!!! the Number is too big to covertes');
            return false;
        }

        var iWords = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
        var ePlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
        var tensPlace = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

        var iWordsLength = numReversed.length;
        var totalWords = "";
        var inWords = new Array();
        var finalWord = "";
        j = 0;
        for (i = 0; i < iWordsLength; i++) {
            switch (i) {
                case 0:
                    if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                        inWords[j] = '';
                    }
                    else {
                        inWords[j] = iWords[actnumber[i]];
                    }
                    inWords[j] = inWords[j] + ' Only';
                    break;
                case 1:
                    tens_complication();
                    break;
                case 2:
                    if (actnumber[i] == 0) {
                        inWords[j] = '';
                    }
                    else if (actnumber[i - 1] != 0 && actnumber[i - 2] != 0) {
                        inWords[j] = iWords[actnumber[i]] + ' Hundred and';
                    }
                    else {
                        inWords[j] = iWords[actnumber[i]] + ' Hundred';
                    }
                    break;
                case 3:
                    if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                        inWords[j] = '';
                    }
                    else {
                        inWords[j] = iWords[actnumber[i]];
                    }
                    if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
                        inWords[j] = inWords[j] + " Thousand";
                    }
                    break;
                case 4:
                    tens_complication();
                    break;
                case 5:
                    if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                        inWords[j] = '';
                    }
                    else {
                        inWords[j] = iWords[actnumber[i]];
                    }
                    if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
                        inWords[j] = inWords[j] + " Lakh";
                    }
                    break;
                case 6:
                    tens_complication();
                    break;
                case 7:
                    if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
                        inWords[j] = '';
                    }
                    else {
                        inWords[j] = iWords[actnumber[i]];
                    }
                    inWords[j] = inWords[j] + " Crore";
                    break;
                case 8:
                    tens_complication();
                    break;
                default:
                    break;
            }
            j++;
        }

        function tens_complication() {
            if (actnumber[i] == 0) {
                inWords[j] = '';
            }
            else if (actnumber[i] == 1) {
                inWords[j] = ePlace[actnumber[i - 1]];
            }
            else {
                inWords[j] = tensPlace[actnumber[i]];
            }
        }
        inWords.reverse();
        for (i = 0; i < inWords.length; i++) {
            finalWord += inWords[i];
        }
        return finalWord;
    }
};

var FileManager = {

    showFilePopup: function (container, valueContainer) {
        //alert(valueContainer);
        jQuery(container).dialog("destroy");
        jQuery(container).dialog({
            height: 257,
            modal: true,
            title: "File Upload",
            width: 381,
            //bgiframe: true,            
            //autoOpen: false, 
            resizable: false

        });
    },

    getUploadedFileDetails: function (jsonData) {
        alert(jsonData.message);
        alert(jsonData.webpath);
        FileManager.closeFilePopup(container);
    },

    closeFilePopup: function (container) {
        jQuery(container).dialog("close");
        jQuery(container).dialog("destroy");
    }
};


var DistrictManager = {
    GetDistrictInformation: function () {
        var items = [["Barguna"],
        ["Barisal"],
        ["Bhola"],
        ["Jhalokati"],
        ["Patuakhali"],
        ["Pirojpur"],
        ["Bandarban"],
        ["Brahmanbaria"],
        ["Chandpur"],
        ["Chittagong"],
        ["Comilla"],
        ["Coxs Bazar"],
        ["Feni"],
        ["Khagrachhari"],
        ["Lakshmipur"],
        ["Noakhali"],
        ["Rangamati"],
        ["Dhaka"],
        ["Faridpur"],
        ["Gazipur"],
        ["Gopalganj"],
        ["Jamalpur"],
        ["Kishoreganj"],
        ["Madaripur"],
        ["Manikganj"],
        ["Munshiganj"],
        ["Mymensingh"],
        ["Narayanganj"],
        ["Narsingdi"],
        ["Netrakona"],
        ["Rajbari"],
        ["Shariatpur"],
        ["Sherpur"],
        ["Tangail"],
        ["Bagerhat"],
        ["Chuadanga"],
        ["Jessore"],
        ["Jhenaidah"],
        ["Khulna"],
        ["Kushtia"],
        ["Magura"],
        ["Meherpur"],
        ["Narail"],
        ["Satkhira"],
        ["Bogra"],
        ["Joypurhat"],
        ["Naogaon"],
        ["Natore"],
        ["Nawabganj"],
        ["Pabna"],
        ["Rajshahi"],
        ["Sirajganj"],
        ["Dinajpur"],
        ["Gaibandha"],
        ["Kurigram"],
        ["Lalmonirhat"],
        ["Nilphamari"],
        ["Panchagarh"],
        ["Rangpur"],
        ["Thakurgaon"],
        ["Habiganj"],
        ["Moulvibazar"],
        ["Sunamganj"],
        ["Sylhet"]];
        return items;
    }
};

var bloodgroupManager = {

    GetBloodGroupArray: function () {
        var items = [["A+"], ["A-"], ["B+"], ["B-"], ["AB+"], ["AB-"], ["O+"], ["O-"]];
        return items;
    },

    GetBloodGroupArrayInBangla: function () {
        var items = [["এ+"], ["এ-"], ["বি+"], ["বি-"], ["এবি+"], ["এবি-"], ["ও+"], ["ও-"]];
        return items;
    }
};

var heightManager = {

    GetHeightArray: function () {
        var items = [["3'0\""], ["3'1\""], ["3'2\""], ["3'3\""],
        ["3'4\""], ["3'5\""], ["3'6\""], ["3'7\""], ["3'8\""],
        ["3'9\""], ["3'10\""], ["3'11\""], ["4'0\""], ["4'1\""],
        ["4'2\""], ["4'3\""], ["4'4\""], ["4'5\""], ["4'6\""], ["4'7\""],
        ["4'8\""], ["4'9\""], ["4'10\""], ["4'11\""], ["5'0\""], ["5'1\""],
        ["5'2\""], ["5'3\""], ["5'4\""], ["5'5\""], ["5'6\""], ["5'7\""], ["5'8\""],
        ["5'9\""], ["5'10\""], ["5'11\""], ["6'0\""], ["6'1\""], ["6'2\""],
        ["6'3\""], ["6'4\""], ["6'5\""], ["6'6\""], ["6'7\""], ["6'8\""],
        ["6'9\""], ["6'10\""], ["6'11\""], ["7'0\""], ["7'1\""], ["7'2\""],
        ["7'3\""], ["7'4\""], ["7'5\""], ["7'6\""], ["7'7\""], ["7'8\""],
        ["7'9\""], ["7'10\""], ["7'11\""], ["8'0\""]];
        return items;
    }
};

var CountryManager = {

    getCountryNames: function () {
        var states = [
            ["Afghanistan"],
            ["Albania"],
            ["Algeria"],
            ["Andorra"],
            ["Angola"],
            ["Antarctica"],
            ["Antigua and Barbuda"],
            ["Argentina"],
            ["Armenia"],
            ["Australia"],
            ["Austria"],
            ["Azerbaijan"],
            ["Bahamas"],
            ["Bahrain"],
            ["Bangladesh"],
            ["Barbados"],
            ["Belarus"],
            ["Belgium"],
            ["Belize"],
            ["Benin"],
            ["Bermuda"],
            ["Bhutan"],
            ["Bolivia"],
            ["Bosnia and Herzegovina"],
            ["Botswana"],
            ["Brazil"],
            ["Brunei"],
            ["Bulgaria"],
            ["Burkina Faso"],
            ["Burma"],
            ["Burundi"],
            ["Cambodia"],
            ["Cameroon"],
            ["Canada"],
            ["Cape Verde"],
            ["Central African Republic"],
            ["Chad"],
            ["Chile"],
            ["China"],
            ["Colombia"],
            ["Comoros"],
            ["Congo"], ["Democratic Republic"],
            ["Congo"], ["Republic of the"],
            ["Costa Rica"],
            ["Cote d'Ivoire"],
            ["Croatia"],
            ["Cuba"],
            ["Cyprus"],
            ["Czech Republic"],
            ["Denmark"],
            ["Djibouti"],
            ["Dominica"],
            ["Dominican Republic"],
            ["East Timor"],
            ["Ecuador"],
            ["Egypt"],
            ["El Salvador"],
            ["Equatorial Guinea"],
            ["Eritrea"],
            ["Estonia"],
            ["Ethiopia"],
            ["Fiji"],
            ["Finland"],
            ["France"],
            ["Gabon"],
            ["Gambia"],
            ["Georgia"],
            ["Germany"],
            ["Ghana"],
            ["Greece"],
            ["Greenland"],
            ["Grenada"],
            ["Guatemala"],
            ["Guinea"],
            ["Guinea-Bissau"],
            ["Guyana"],
            ["Haiti"],
            ["Honduras"],
            ["Hong Kong"],
            ["Hungary"],
            ["Iceland"],
            ["India"],
            ["Indonesia"],
            ["Iran"],
            ["Iraq"],
            ["Ireland"],
            ["Israel"],
            ["Italy"],
            ["Jamaica"],
            ["Japan"],
            ["Jordan"],
            ["Kazakhstan"],
            ["Kenya"],
            ["Kiribati"],
            ["Korea North"],
            ["Korea South"],
            ["Kuwait"],
            ["Kyrgyzstan"],
            ["Laos"],
            ["Latvia"],
            ["Lebanon"],
            ["Lesotho"],
            ["Liberia"],
            ["Libya"],
            ["Liechtenstein"],
            ["Lithuania"],
            ["Luxembourg"],
            ["Macedonia"],
            ["Madagascar"],
            ["Malawi"],
            ["Malaysia"],
            ["Maldives"],
            ["Mali"],
            ["Malta"],
            ["Marshall Islands"],
            ["Mauritania"],
            ["Mauritius"],
            ["Mexico"],
            ["Micronesia"],
            ["Moldova"],
            ["Mongolia"],
            ["Morocco"],
            ["Monaco"],
            ["Mozambique"],
            ["Namibia"],
            ["Nauru"],
            ["Nepal"],
            ["Netherlands"],
            ["New Zealand"],
            ["Nicaragua"],
            ["Niger"],
            ["Nigeria"],
            ["Norway"],
            ["Oman"],
            ["Pakistan"],
            ["Panama"],
            ["Papua New Guinea"],
            ["Paraguay"],
            ["Peru"],
            ["Philippines"],
            ["Poland"],
            ["Portugal"],
            ["Qatar"],
            ["Romania"],
            ["Russia"],
            ["Rwanda"],
            ["Samoa"],
            ["San Marino"],
            ["Sao Tome"],
            ["Saudi Arabia"],
            ["Senegal"],
            ["Serbia and Montenegro"],
            ["Seychelles"],
            ["Sierra Leone"],
            ["Singapore"],
            ["Slovakia"],
            ["Slovenia"],
            ["Solomon Islands"],
            ["Somalia"],
            ["South Africa"],
            ["Spain"],
            ["Sri Lanka"],
            ["Sudan"],
            ["Suriname"],
            ["Swaziland"],
            ["Sweden"],
            ["Switzerland"],
            ["Syria"],
            ["Taiwan"],
            ["Tajikistan"],
            ["Tanzania"],
            ["Thailand"],
            ["Togo"],
            ["Tonga"],
            ["Trinidad and Tobago"],
            ["Tunisia"],
            ["Turkey"],
            ["Turkmenistan"],
            ["Uganda"],
            ["Ukraine"],
            ["United Arab Emirates"],
            ["United Kingdom"],
            ["United States"],
            ["Uruguay"],
            ["Uzbekistan"],
            ["Vanuatu"],
            ["Venezuela"],
            ["Vietnam"],
            ["Yemen"],
            ["Zambia"],
            ["Zimbabwe"]
        ];

        return states;
    }

};

function addExtensionClass(extension) {
    switch (extension) {
        case '.jpg':
        case '.img':
        case '.png':
        case '.gif':
            return "img-file";
        case '.doc':
        case '.docx':
            return "doc-file";
        case '.xls':
        case '.xlsx':
            return "xls-file";
        case '.pdf':
            return "pdf-file";
        case '.zip':
        case '.rar':
            return "zip-file";
        default:
            return "default-file";
    }
}







(function () {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    Date.prototype.getMonthName = function () {
        return months[this.getMonth()];
    };
    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };
    Date.prototype.FirstDateOfMonth = function () {

        return new Date(this.getFullYear(), this.getMonth(), 1);

    };
    Date.prototype.getDatesByWeekName = function (weekName) {
        var weekDates = [];
        var totalDays = this.getTotalDays();
        for (var i = 0; i < totalDays; i++) {
            var date = new Date(this.getFullYear(), this.getMonth(), i + 1);
            if (date.getDayName() == weekName) {
                weekDates.push(date);
            }

        }
        return weekDates;


    };
    Date.prototype.getTotalDays = function () {

        return daysInMonth(this.getFullYear(), this.getMonth(), 0);

    };
    function daysInMonth(year, month, day) {

        var d = new Date(year, month + 1, day);
        //var date = new Date(d.setDate(-1));
        return d.getDate();
        //return new Date(year, month, 0).getDate();
    }
})();


(function () {

    Array.prototype.add = function (obj) {

        if (obj == null) {
            throw new TypeError('object is null or not defined');
        }
        return this.push(obj);
    };
    Array.prototype.remove = function (obj) {

        if (this.length < 1) {
            throw new TypeError('Array is empty or not defined');
        }
        if (obj == null) {
            throw new TypeError('object is null or not defined');
        }
        var index = this.indexOfArray(obj);

        if (index != -1) {
            this.splice(index, 1);
        }

    };

    Array.prototype.removeObject = function (obj) {

        if (this.length < 1) {
            throw new TypeError('Array is empty or not defined');
        }
        if (obj == null) {
            throw new TypeError('object is null or not defined');
        }
        var dArray = $.grep(this, function (dt) {
            return (dt != obj);
        });

        var index = this.indexOfArray(obj);

        if (index != -1) {
            this.splice(index, 1);
        }

        return dArray;

    };

    Array.prototype.indexOfArray = function (obj) {
        if (obj == null) {
            throw new TypeError('object is null or not defined');
        }
        var index = -1;
        for (var i = 0; i < this.length; i++) {
            if (JSON.stringify(this[i]) == JSON.stringify(obj)) {
                index = i;
                break;
            }
        }
        return index;
    };

})();


//var filterable = {
//    extra: true,
//    operators: {
//        string: {
//            contains: "Contains",
//            startswith: "Starts with",
//            eq: "Is equal to",
//            neq: "Is not equal to"
//        }
//    }
//}