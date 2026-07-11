// =====================================================
// WEB API
// =====================================================

function doGet(e){

  try{

    const action = e.parameter.action || "";

    switch(action){

      case "loginGuru":
        return output(loginGuruAPI(e));

      case "loginOrtu":
        return output(loginOrtuAPI(e));

      case "dashboard":
        return output(dashboardAPI(e));

      case "riwayat":
        return output(riwayatAPI(e));

      case "detail":
        return output(detailAPI(e));

      default:

        return output(
          failed("Action tidak dikenal.")
        );

    }

  }catch(err){

      return output(
        failed(err.toString())
      );

  }

}