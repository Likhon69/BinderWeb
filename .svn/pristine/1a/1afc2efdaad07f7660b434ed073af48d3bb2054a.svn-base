$(document).ready(function () {
    Client_LoadStatusCombo();
    GenerateClientGrid();
    GetContactGrid(0);
    $("#cmbStatus").change(function () {
        GenerateClientGrid();
    });
    $("#txtClientCode").keyup(function (e) {


        var clientCode = $("#txtClientCode").val();
        var objClientCode = CheckDuplicateClientcode(clientCode);

        if ($.trim(clientCode) == objClientCode.ClientCode) {
            AjaxManager.MsgBox('warning', 'center', 'Already Exist:', 'Client Code Already Exist.',
                    [{
                        addClass: 'btn btn-primary', text: 'Ok', onClick: function ($noty) {
                            $noty.close();
                        }
                    }]);
            $("#txtClientCode").val('');

        } else {

        }

    });


});


function Client_LoadStatusCombo() {

    $("#cmbStatus").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Active", value: "1" },
            { text: "Inactive", value: "0" }
        ],
        filter: "contains",
        index: 0,
        suggest: true
    });

}

function Client_clearAll() {
    $("#btnSave").text("Save");
    $("#txtClientCode")
       .attr("disabled", "disabled")
       .css("background-color", "whitesmoke");

    $('#chkIsActive').attr('checked', true);
    $('#chkIsMovement').attr('checked', true);

    $("#txtClientName").val('');
    $("#txtEmail").val('');
    $("#txtAddress").val('');
    $("#txtPrimaryContact").val('');
    $("#txtContactNo").val('');
    $("#txtClientCode").val('');
    $("#txtClientID").val('');
    clearContactGrid();
    GetContactGrid_Blank();
    clearValidatorMsg_Client();
    $("#ContactGrid").data("kendoGrid").dataSource.data([]);

}

function clearValidatorMsg_Client() {
    $("#DetailDiv > form").kendoValidator();
    $("#DetailDiv").find("span.k-tooltip-validation").hide();
    var status = $(".status");

    status.text("").removeClass("invalid");
}

function showDetailWindow_Client() {
    var win = $("#DetailDiv").kendoWindow({
        visible: true,
        width: 980,
        modal: true,
        title: 'Purpose/Client Details'
    }).data("kendoWindow").center();;

    win.open();

    $("#btnClose").click(function () {
        Client_clearAll();
        $("#DetailDiv").data("kendoWindow").close();
    });
}

function clearContactGrid() {

    $("#ContactGrid").empty();
    $("#ContactGrid").kendoGrid();
    $("#ContactGrid").data("kendoGrid").dataSource.data([]);

}

function ClientFormValidator() {
    var data = [];
    var validator = $("#DetailDiv").kendoValidator().data("kendoValidator"),
        status = $(".status");
    if (validator.validate()) {
        status.text("").addClass("valid");

        return true;
    } else {
        status.text("Oops! There is invalid data in the form.").addClass("invalid");
        return false;
    }
}

function ClientGridDataSource(status) {
    var gridDataSource = new kendo.data.DataSource({
        type: "json",
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        allowUnsort: true,
        pageSize: 10,
        transport: {
            read: {
                url: '../Client/GetAllClient/?Status=' + status,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options) {

                return JSON.stringify(options);
            }
        },
        schema: { data: "Items", total: "TotalCount" }
    });
    return gridDataSource;
}

function GenerateClientGrid() {
    var status = $("#cmbStatus").val();
    $("#ClientGrid").kendoGrid({
        dataSource: ClientGridDataSource(status),
        pageable: {
            refresh: true,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        },
        xheight: 450,
        filterable: true,
        sortable: true,
        columns: GenerateClientGridColumns(),
        editable: false,
        navigatable: true,
        selectable: "row"
    });
}

function GenerateClientGridColumns() {
    return columns = [
        { field: "ClientId", hidden: true },
        { field: "ClientCode", title: "Client/Purpose Code", width: 120 },
        { field: "ClientName", title: "Client/Purpose Name", width: 120 },
        { field: "Address", title: "Address", width: 120 },
        { field: "Email", title: "Email", width: 120 },
        { field: "PrimaryContact", title: "Primary Contact", width: 120 },
        { field: "ContactNo", title: "Contact No", width: 120 },
        { field: "IsActive", title: "Is Active", width: 60, template: "#= IsActive ? 'Yes' : 'No' #" },
        { field: "IsMovement", title: "Is Movement", width: 60, template: "#= IsMovement ? 'Yes' : 'No' #" },


    { field: "Edit", title: "Edit", filterable: false, width: 60, template: '<input type="button" class="k-button" value="Edit" id="btnEdit" onClick="clickEventForEditButton_Client()"  />', sortable: false }
    ];
}

function clickEventForEditButton_Client() {



    var entityGrid = $("#ClientGrid").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());
    FillEditItemClient(selectedItem);

    GetContactGrid(selectedItem.ClientId);

}

function FillEditItemClient(items) {
    $("#txtClientCode")
       .removeAttr("disabled")
       .css("background-color", "white");

    $("#btnSave").text("Update");

    $('#chkIsActive').attr('checked', items.IsActive);
    $('#chkIsMovement').attr('checked', items.IsMovement);
    $("#txtClientID").val(items.ClientId);
    $("#txtClientCode").val(items.ClientCode);
    $("#txtClientName").val(items.ClientName);
    $("#txtEmail").val(items.Email);
    $("#txtAddress").val(items.Address);
    $("#txtPrimaryContact").val(items.PrimaryContact);
    $("#txtContactNo").val(items.ContactNo);
    showDetailWindow_Client();
}

function AddNewClientClicked() {
    Client_clearAll();
    showDetailWindow_Client();
}

function SubmitButtonClickEvent_Client() {
    if (ClientFormValidator()) {
        SaveClient();
    } else {
        alert("Please input required filed");
    }
}

function SaveClient() {
    //debugger;
    var client = getClientObject();
    var contactList = GetContactList();

    var jsonParam = 'clientObj=' + JSON.stringify(client).replace(/&/g, "^") + "&ContactList=" + JSON.stringify(contactList).replace(/&/g, "^");

    var serviceUrL = "../Client/SaveClient";
    AjaxManager.SendJson(serviceUrL, jsonParam, onSuccess, onFailed);

    function onSuccess(jsonData) {
        if (jsonData == "Success") {

            AjaxManager.MsgBox('success', 'center', 'Success', "Data Save Successfully",
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                        Client_clearAll();
                        $("#ClientGrid").data("kendoGrid").dataSource.read();
                        $("#txtClientName").focus();
                    }
                }]);
        } else {

            AjaxManager.MsgBox('error', 'center', 'Error', jsonData,
                [{
                    addClass: 'btn btn-primary',
                    text: 'Ok',
                    onClick: function ($noty) {
                        $noty.close();
                    }
                }]);
        }
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

}

function getClientObject() {
    var c = new Object();

    var cID = $("#txtClientID").val();
    if (cID == '' || cID == undefined || cID == null) {
        c.ClientId = 0;
    }
    else {
        c.ClientId = $("#txtClientID").val();
    }
    c.ClientCode = $("#txtClientCode").val();
    c.ClientName = $("#txtClientName").val();
    c.Address = $("#txtAddress").val();
    c.Email = $("#txtEmail").val();
    c.PrimaryContact = $("#txtPrimaryContact").val();
    c.ContactNo = $("#txtContactNo").val();
    c.IsActive = $("#chkIsActive").is(':checked');
    c.IsMovement = $("#chkIsMovement").is(':checked');
    return c;

}

function GetContactList() {

    var isPrimery = [];
    var isActive = [];
    var isMovement = [];
    var name = "";
    $("#ContactGrid .k-grid-content tbody tr").each(function () {
        var $row = $(this);
        var a = $row.find('#check_row').attr('checked');
        a = a == "checked" ? true : false;
        isPrimery.push(a);

        var b = $row.find('#check_rowIsActive').attr('checked');
        b = b == "checked" ? true : false;
        isActive.push(b);
        
    });

    var contactArray = [];
    var gridContactSummary = $("#ContactGrid").data("kendoGrid");
    var gridData = gridContactSummary.dataSource.data();
    for (var i = 0; i < gridData.length; i++) {
        var contact = gridData[i];
        var objContact = new Object();
        objContact.ID = contact.ID == undefined ? 0 : contact.ID;
        objContact.PERSON_NAME = contact.PERSON_NAME;
        objContact.DESIGNATION = contact.DESIGNATION;
        objContact.IS_PRIMARY_CONTACT = isPrimery[i] ? 1 : 0;
        objContact.CELL_PHONE = contact.CELL_PHONE;
        objContact.EMAIL = contact.EMAIL;
        objContact.HOME_ADDRESS = contact.HOME_ADDRESS;
        objContact.OFFICE_ADDRESS = contact.OFFICE_ADDRESS;
        objContact.IS_ACTIVE = isActive[i] ? 1 : 0;

        contactArray.push(objContact);
    }

    return contactArray;
}

function ContactGridDataSource(clientId) {
    var gridDataSource = new kendo.data.DataSource({
        type: "json",
        batch: true,
        pageSize: 10,
        transport: {
            read: {
                url: '../Client/getClientContactList/?ClientID=' + clientId,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8"
            },
            parameterMap: function (options) {
                return JSON.stringify(options);
            }
        },
        schema: {
            data: "Items",
            total: "TotalCount",
            model: {
                fields: {
                    IS_PRIMARY_CONTACT: { type: "boolean" },
                    PERSON_NAME: { validation: { required: true, maxlength: "100", validationmessage: "Person name should not be left blank." } },
                    EMAIL: { validation: { email: true, required: true, maxlength: "50" } },
                    DESIGNATION: { validation: { maxlength: "50" } },
                    CELL_PHONE: { validation: { maxlength: "25" } },
                    HOME_ADDRESS: { validation: { maxlength: "500" } },
                    OFFICE_ADDRESS: { validation: { maxlength: "500" } },
                    IS_ACTIVE: { type: "boolean" },
                }
            }
        }
    });

    return gridDataSource;
}

function GetContactGrid(clientId) {
    $("#ContactGrid").kendoGrid({
        dataSource: ContactGridDataSource(clientId),
        pageable: false,
        toolbar: ["create"],
        columns: [
            { field: "ID", hidden: true },
            { field: "CLIENT_ID", hidden: true },
            { field: "PERSON_NAME", title: "Person Name", required: true },
            { field: "DESIGNATION", title: "Designation" },
            { field: "IS_PRIMARY_CONTACT", title: "Is Primary Contact", filterable: false, sortable: false, template: "<input id='check_row' name='check_row' class='check_row' type='checkbox' data-bind='checked: IS_PRIMARY_CONTACT' #= IS_PRIMARY_CONTACT ? checked='checked' : '' #/>" },
            { field: "CELL_PHONE", title: "Cell No." },
            { field: "EMAIL", title: "Email" },
            { field: "HOME_ADDRESS", title: "Home Address" },
            { field: "OFFICE_ADDRESS", title: "Office Address" },
            { field: "USER_ID", hidden: true },
            { field: "LAST_UPDATE_DATE", hidden: true },
            { field: "ENTRY_DATE", hidden: true },
            { field: "IS_ACTIVE", title: "Status", filterable: false, sortable: false, template: "<input id='check_rowIsActive' name='check_rowIsActive' class='check_row' type='checkbox' data-bind='checked: IS_ACTIVE' #= IS_ACTIVE ? checked='checked' : '' #/>" }],
        editable: {
            confirmation: false
        },
        dataBound: function () {

            var dataView = this.dataSource.view();
            for (var i = 0; i < dataView.length; i++) {
                var uid = dataView[i].uid;
                if (dataView[i].IS_PRIMARY_CONTACT == "1") {
                    $("#ContactGrid .k-grid-content tbody").find("tr[data-uid=" + uid + "] #check_row").attr('checked', 'true');
                }
                if (dataView[i].IS_ACTIVE == "1") {
                    $("#ContactGrid .k-grid-content tbody").find("tr[data-uid=" + uid + "] #check_rowIsActive").attr('checked', 'true');
                }

            }
        }
    });
}

function GetContactGrid_Blank() {
    $("#ContactGrid").kendoGrid({
        dataSource: ContactGridDataSource(),
        pageable: false,
        toolbar: ["create"],
        columns: [
            { field: "PERSON_NAME", title: "Person Name", required: true },
            { field: "DESIGNATION", title: "Designation" },
            { field: "IS_PRIMARY_CONTACT", title: "Is Primary Contact", filterable: false, sortable: false, template: "<input id='check_row' name='check_row' class='check_row' type='checkbox' data-bind='checked: IS_PRIMARY_CONTACT' #= IS_PRIMARY_CONTACT ? checked='checked' : '' #/>" },

            { field: "CELL_PHONE", title: "Cell No." },
            { field: "EMAIL", title: "Email" },
            { field: "HOME_ADDRESS", title: "Home Address" },
            { field: "OFFICE_ADDRESS", title: "Office Address" },
         { field: "IS_ACTIVE", title: "Status", filterable: false, sortable: false, template: "<input id='check_rowIsActive' name='check_rowIsActive' class='check_row' type='checkbox' data-bind='checked: IS_ACTIVE' #= IS_ACTIVE ? checked='checked' : '' #/>" }
        ],
        editable: {
            confirmation: false
        }
    });
}

function CheckDuplicateClientcode(clientCode) {

    var objClientCode = "";
    var jsonParam = "clientCode=" + clientCode;
    var serviceUrl = "../Client/CheckDuplicateClientcode/";
    AjaxManager.GetJsonResult(serviceUrl, jsonParam, false, false, onSuccess, onFailed);

    function onSuccess(jsonData) {
        objClientCode = jsonData;
    }
    function onFailed(error) {
        window.alert(error.statusText);
    }
    return objClientCode;
}


