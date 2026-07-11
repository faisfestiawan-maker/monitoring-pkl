function doPost(e) {

  try {

    const req = JSON.parse(e.postData.contents);
    const action = req.action;

    let result = {};

    switch(action){

      case "loginGuru":
        result = apiLoginGuru(req.email);
        break;

      case "loginOrtu":
        result = apiLoginOrtu(req.nis);
        break;

      case "dashboard":
        result = apiDashboard(req.user, req.tanggal);
        break;

      case "riwayat":
        result = apiRiwayat(req.user);
        break;

      case "detail":
        result = apiDetail(req.nis, req.tanggal);
        break;

      default:
        result = {
          success:false,
          message:"Action tidak dikenali."
        };

    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err){

    return ContentService
      .createTextOutput(JSON.stringify({
        success:false,
        message:err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  }

}