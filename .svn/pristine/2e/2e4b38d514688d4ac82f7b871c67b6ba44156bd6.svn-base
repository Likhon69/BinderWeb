var newsHeadlinesManager = {
    getNewsHeadlinesData: function () {
        var newsHeadlines = "";
        var jsonParam = '';
        var serviceUrl = "../NewsHeadline/GetNewsHeadline/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            newsHeadlines = jsonData;
        }
        function onFailed(error) {
            AjaxManager.MsgBox('error', 'center', 'Error', error.statusText,
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }

        return newsHeadlines;
    },
};

var newsHeadlonesHelper = {
    initNewsHeadlones: function () {
        newsHeadlonesHelper.makeNewsHeadlines();
        $("#btnNewsHeadlineClose").click(function () {
            $("#newsOnFooter").hide();
        });


    },
    makeNewsHeadlines: function () {
        //var marquee = '<span id="spanId">Latest News</span><ul>';//worked as ticker
        var marquee = '<span id="spanId" class="font-title">Announcement</span><button type="button" id="btnNewsHeadlineClose" class="k-button" style="float:right">x</button>';
        // marquee += '<a onclick="newsHeadlonesHelper.clickEventForNewsHwadline(12)">newsHeadlonesHelper.clickEventForNewsHwadline(12) </a>';
        // marquee += '<a onclick="newsHeadlonesHelper.clickEventForNewsHwadline(13)">newsHeadlonesHelper.clickEventForNewsHwadline(13) </a></div></marquee>';
        marquee += '<marquee behavior="scroll" scrollamount="3" onMouseOver="this.scrollAmount=0" onMouseOut="this.scrollAmount=3" class = "newsHeadlinesMarquee"> ';//Worked


        var newsHeadLines = newsHeadlinesManager.getNewsHeadlinesData();
        for (var i = 0; i < newsHeadLines.length; i++) {
            var publishDate = kendo.toString(kendo.parseDate(newsHeadLines[i].PublishDate, 'dd/MM/yyyy'), 'dd/MM/yyyy');

            // marquee += '<marquee behavior="scroll" direction="left" scrollamount="2" onMouseOver="this.scrollAmount=0" onMouseOut="this.scrollAmount=2" class = "newsHeadlinesMarquee" onclick="newsHeadlonesHelper.clickEventForNewsHwadline(' + newsHeadLines[i].NewsId + ')" >' + newsHeadLines[i].NewsTitle + '</marquee>';
            // marquee += '<marquee behavior="scroll" direction="left">' + title + '</marquee>';
            marquee += '<a href="#" onclick="newsHeadlonesHelper.clickEventForNewsHwadline(' + newsHeadLines[i].NewsId + ',' + newsHeadLines[i].NewsType + ')">' + '&#187;&#187;&nbsp;<span  class="news-title-color">' + newsHeadLines[i].NewsTitle + ' :</span> ' + newsHeadlonesHelper.ConvertHtmlToString(newsHeadLines[i].NewsDetails) + '</a> ';//Worked '(Published Date:' + publishDate + ')  
            // marquee += '<li><a onclick="newsHeadlonesHelper.clickEventForNewsHwadline(' + newsHeadLines[i].NewsId + ')">' + '&#187; (' + publishDate + ') ' + newsHeadLines[i].NewsTitle + '     </a></li> ';//worked as ticker

        }
        $("#NewsHeadline").html(marquee + '</marquee>');//Worked
        //if (newsHeadLines.length > 0) {
        //    $("#news_ticker").show();
        //}
        // $("#NewsHeadline").html(marquee + '</ul><button type="button" id="btnNewsHeadlineClose" class="k-button" style="float:right">x</button>');//worked as ticker
    },
    clickEventForNewsHwadline: function (newsId, newsType) {

        if (newsType != undefined) {
            if (newsType == 1) {
                window.location.replace("../NewsAndNotice/ViewNewsSettings?" + newsId);

            } else if (newsType == 2) {
                window.location.replace("../NewsAndNotice/ViewNoticeSettings?" + newsId);

            }
        }

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
