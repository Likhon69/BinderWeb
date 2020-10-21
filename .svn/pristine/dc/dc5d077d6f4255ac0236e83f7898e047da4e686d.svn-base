var image = new Image();
var _breadcrums =new Object();
var mnManager = {

    getMenu: function () {
        var objMenuList = "";

        //var pathName = window.location.pathname;
       // var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = coreApi +"/Menu/GetMenuByPermission/";



        var jsonParam = "";// "moduleId=" + moduleId;
        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objMenuList = jsonData;

        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return objMenuList;
    },
    getParentMenuByMenu: function (parentMenuId) {
        var objParentMenuList = "";

        var serviceURL = coreApi +"/Menu/GetParentMenuByMenu/";



        var jsonParam = "parentMenuId=" + parentMenuId;
        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {
            objParentMenuList = jsonData;

        }
        function onFailed(error) {
            window.alert(error.statusText);
        }

        return objParentMenuList;
    },
    getCurrentUser: function (menuRefresh) {
        var jsonParam = '';
        var pathName = window.location.pathname;
        var pageName = pathName.substring(pathName.lastIndexOf('/') + 1);
        var serviceURL = "../Home/GetCurrentUser";
        //if (pageName.toLowerCase() == "home.mvc") {
        //    serviceURL = "../Home/GetCurrentUser";
        //}
        //else {
        //    serviceURL = "../Home/GetCurrentUser";
        //}

        //AjaxManager.SendJson(serviceURL, jsonParam, onSuccess, onFailed);

        AjaxManager.GetJsonResult(serviceURL, jsonParam, false, false, onSuccess, onFailed);
        function onSuccess(jsonData) {

            CurrentUser = jsonData;
            if (CurrentUser != undefined) {

                image.src = CurrentUser.ProfilePicture;
                if ((CurrentUser.ProfilePicture != null && CurrentUser.ProfilePicture != "")) {

                    $("#profilePicture").attr('src', '../' + CurrentUser.ProfilePicture);

                } else {
                    if (CurrentUser.Gender == 1) {
                        $("#profilePicture").attr('src', '../../Images/male.png');
                    } else {
                        $("#profilePicture").attr('src', '../../Images/female.png');
                    }
                }

                var userName = "Welcome " + CurrentUser.UserName;
                $("#lblWelcome").html(userName);
                if (CurrentUser.FullLogoPath != null && CurrentUser.FullLogoPath!="") {
                    // $("#headerLogo").attr('style', 'background-image: url("' + CurrentUser.FullLogoPath + '") !important');
                    $("#companyImage").attr('src', CurrentUser.FullLogoPath);
                }
            }

        }
        function onFailed(error) {
            window.alert(error.statusText);
        }
    },

    Logoff: function () {
        var serviceURL = "../Home/Logoff";
        window.location.href = serviceURL;
    }
};

var mnHelper = {
   
    GetMenuInformation: function () {
        var objMenuList = mnManager.getMenu();
        mnHelper.populateMenus(objMenuList);
       // mnManager.getCurrentUser(true);
    },

    populateMenus: function (menus) {
        var dynamicmenuArray = [];
        var chiledMenuArray = [];
        var parentMenubyMenuId = [];
        var pathName = window.location.pathname;

        for (var j = 0; j < menus.length; j++) {
            if (menus[j].MenuPath == ".." + pathName) {
                parentMenubyMenuId = mnManager.getParentMenuByMenu(menus[j].ParentMenu);//This parent menu is to make active css to parent menu
            }
        }

        var menulink = "";

        for (var i = 0; i < menus.length; i++) {
            var haveparentMenu = 0;
            if (menus[i].ParentMenu == null || menus[i].ParentMenu == 0) {
                for (var k = 0; k < parentMenubyMenuId.length; k++) {
                    if (parentMenubyMenuId[k].MenuId == menus[i].MenuId) {
                        haveparentMenu = 1;
                    }
                }
                if (haveparentMenu == 1) {
                    menulink += "<li class='ob-selected-ancestor'>";
                } else {
                    menulink += "<li>";
                }

                if (menus[i].MenuPath == null || menus[i].MenuPath == "") {
                    menulink += menus[i].MenuName;
                }
                else {
                    menulink += "<a href='" + menus[i].MenuPath + "'>" + menus[i].MenuName + "</a>";
                }
                menulink += mnHelper.addchiledMenu(menus[i], menus[i].MenuId, menus, parentMenubyMenuId);

                menulink += "</li>";


            }
        }
        ////debugger;
        var isHr = empressCommonHelper.IsHr();
        if (isHr == true) {
            menulink += "<li><a href='#' id='liAboutUs'>About</a></li>";
        }
       //../Shared/_AboutUs.cshtml

        // menulink = "<li>Products<ul><li>Furniture<ul><li>Tables & Chairs</li><li>Sofas</li><li>Occasional Furniture</li><li>Childerns Furniture</li><li>Beds</li></ul></ul></li>";



        $("#menu").kendoMenu({
            //closeOnClick: false
        });
        var menu = $("#menu").data("kendoMenu");
        menu.append(menulink);
        $("#menu").kendoMenu({
            select: function (e) {
                ////debugger;
                //var selected = menu.get("selected");

                //// unhighlight old selection
                //if (selected != null)
                //    $(selected).removeClass("k-state-selected");

                //// highlight current selection
                //selected = e.item;
                //$(selected).addClass("k-state-selected");
                //viewModelMenu.set("selected", selected);

            },

        });
     
      //  mnHelper.GetBreadcrums();
    },
    addchiledMenu: function (objMenuOrginal, menuId, objMenuList, parentMenubyMenuId) {


        var menulink = "<ul>";
        var added = false;
        var haveChildsParentMenu = 0;
        for (var j = 0; j < objMenuList.length; j++) {
            if (objMenuList[j].ParentMenu == menuId) {
                menulink += "<li id=" + objMenuList[j].MenuName + " >";
                if (objMenuList[j].MenuPath == null || objMenuList[j].MenuPath == "") {

                    menulink += "<a href='#'>" + objMenuList[j].MenuName + "</a>";
                }
                else {
                    menulink += "<a href='" + objMenuList[j].MenuPath + "'>" + objMenuList[j].MenuName + "</a>";
                }
                menulink += mnHelper.addchiledMenu(objMenuList[j], objMenuList[j].MenuId, objMenuList);
                menulink += "</li>";
                added = true;
            }
        }
        menulink += "</ul>";
        if (added == false) {
            menulink = "";
        }

        return menulink;
    },
    GetBreadcrums: function () {

        var jsonParam = '';
        var serviceUrl = "../Home/GetBreadCrumbs/";
        AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

        function onSuccess(jsonData) {

            ////var js = jsonData.split('"');
            //if (jsonData == "Success") {


            //}
            
            _breadcrums = jsonData;
            $("#divBreadcums").html(_breadcrums);
        }

        function onFailed(error) {

        }
    },

};