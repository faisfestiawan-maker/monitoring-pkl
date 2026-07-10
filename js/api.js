// ================================================
// API CONFIGURATION
// ================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";


// ================================================
// GET REQUEST
// ================================================

async function getAPI(params){

    try{

        const query = new URLSearchParams(params);

        const response = await fetch(
            API_URL + "?" + query.toString()
        );

        if(!response.ok){

            throw new Error(
                "HTTP Error : " + response.status
            );

        }

        const result = await response.json();

        console.log("API RESULT :", result);

        return result;

    }catch(err){

        console.error(err);

        throw err;

    }

}


// ================================================
// LOGIN GURU
// ================================================

async function loginGuru(email){

    return await getAPI({

        action:"loginGuru",

        email:email

    });

}


// ================================================
// LOGIN ORTU
// ================================================

async function loginOrtu(nis){

    return await getAPI({

        action:"loginOrtu",

        nis:nis

    });

}


// ================================================
// DASHBOARD
// ================================================

async function getDashboard(user,tanggal){

    return await getAPI({

        action:"dashboard",

        tanggal:tanggal,

        role:user.role,

        nama:user.nama || "",

        nis:user.nis || ""

    });

}


// ================================================
// RIWAYAT
// ================================================

async function getRiwayat(user,tanggalAwal,tanggalAkhir){

    return await getAPI({

        action:"riwayat",

        tanggalAwal:tanggalAwal,

        tanggalAkhir:tanggalAkhir,

        role:user.role,

        nama:user.nama || "",

        nis:user.nis || ""

    });

}


// ================================================
// DETAIL FOTO
// ================================================

async function getDetail(nis,tanggal){

    return await getAPI({

        action:"detail",

        nis:nis,

        tanggal:tanggal

    });

}