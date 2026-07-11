// =====================================================
// DETAIL.GS
// =====================================================

function detailAPI(e){

    return detail({

        nis : e.parameter.nis,

        tanggal : e.parameter.tanggal

    });

}


function detail(req){

    const data = values(SHEET_PRESENSI);

    data.shift();

    const row = data.find(r =>

        String(r[3]) == String(req.nis) &&
        String(r[1]) == String(req.tanggal)

    );

    if(!row){

        return failed("Foto tidak ditemukan.");

    }

    return success({

        nis : row[3],

        nama : row[4],

        tanggal : row[1],

        jam : row[2],

        foto : row[8],

        status : row[9],

        keterangan : row[11]

    });

}