function output(obj){

  return ContentService
      .createTextOutput(
          JSON.stringify(obj)
      )
      .setMimeType(
          ContentService.MimeType.JSON
      );

}

function success(data){

    return Object.assign({

        success:true

    },data);

}

function failed(msg){

    return{

        success:false,

        message:msg

    };

}