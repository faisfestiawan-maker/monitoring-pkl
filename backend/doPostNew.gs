function doPost(e) {

  try {

    const req = JSON.parse(e.postData.contents || "{}");
    const action = req.action || "";

    let result = {};

    switch(action){

      case "loginGuru":
        result = apiLoginGuru(req.email);
        break;

      case "loginOrtu":
        result = apiLoginOrtu(req.nis);
        break;

      case "dashboard":
        const dashboardUser = {
          role: req.role || "",
          nama: req.nama || "",
          nis: req.nis || ""
        };
        result = apiDashboard(dashboardUser, req.tanggal);
        break;

      case "riwayat":
        const riwayatUser = {
          role: req.role || "",
          nama: req.nama || "",
          nis: req.nis || ""
        };
        result = apiRiwayat(riwayatUser, req.tanggalAwal, req.tanggalAkhir);
        break;

      case "detail":
        result = apiDetail(req.nis, req.tanggal);
        break;

      default:
        result = {
          success: false,
          message: "Action tidak dikenali: " + action
        };

    }

    return createCORSOutput(result);

  } catch(err){

    return createCORSOutput({
      success: false,
      message: err.toString()
    });

  }

}

function createCORSOutput(obj) {

  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);

}
