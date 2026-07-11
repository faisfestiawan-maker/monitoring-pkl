// =====================================================
// AUTH.GS
// =====================================================

/**
 * Login Guru / Kajur
 * request:
 * {
 *   action:"loginGuru",
 *   email:"guru@smkn1glagah.sch.id"
 * }
 */
function loginGuruAPI(e){

    const email = String(
        e.parameter.email || ""
    ).trim().toLowerCase();

    const admin = values(SHEET_ADMIN);

    admin.shift();

    const row = admin.find(r=>

        String(r[1])
        .trim()
        .toLowerCase()==email

    );

    if(!row){

        return failed(
            "Email tidak ditemukan."
        );

    }

    return success({

        user:{

            role:row[2],

            nama:row[0],

            email:row[1]

        }

    });

}



/**
 * Login Orang Tua
 *
 * request:
 * {
 *    action:"loginOrtu",
 *    nis:"26101"
 * }
 */

function loginOrtuAPI(e){

    const nis = String(
        e.parameter.nis || ""
    );

    const siswa = getDataSiswa();

    const anak = siswa.find(s=>

        s.nis==nis

    );

    if(!anak){

        return failed(
            "NIS tidak ditemukan."
        );

    }

    return success({

        user:{

            role:ROLE_ORTU,

            nis:anak.nis,

            nama:anak.nama,

            kelas:anak.kelas

        }

    });

}