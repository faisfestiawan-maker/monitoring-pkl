// =====================================================
// SPREADSHEET
// =====================================================

function ss(){

    return SpreadsheetApp.openById(
        SPREADSHEET_ID
    );

}

function sheet(name){

    return ss().getSheetByName(name);

}

function values(name){

    return sheet(name)
        .getDataRange()
        .getValues();

}

function today(){

    return Utilities.formatDate(

        new Date(),

        Session.getScriptTimeZone(),

        "yyyy-MM-dd"

    );

}