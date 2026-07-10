// ================================================
// API CONFIGURATION
// ================================================

// Ganti dengan URL Web App Apps Script setelah deploy
const API_URL = "https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";


// ================================================
// POST REQUEST
// ================================================

async function postAPI(data){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        if(!response.ok){

            throw new Error(
                "HTTP Error : " + response.status
            );

        }

        return await response.json();

    }catch(err){

        console.error(err);

        throw err;

    }

}


// ================================================
// LOGIN GURU
// ================================================

async function loginGuru(email){

    return await postAPI({

        action:"loginGuru",

        email:email

    });

}


// ================================================
// LOGIN ORTU
// ================================================

async function loginOrtu(nis){

    return await postAPI({

        action:"loginOrtu",

        nis:nis

    });

}


// ================================================
// DASHBOARD
// ================================================

async function getDashboard(user,tanggal){

    return await postAPI({

        action:"dashboard",

        user:user,

        tanggal:tanggal

    });

}


// ================================================
// RIWAYAT
// ================================================

async function getRiwayat(user,tanggalAwal,tanggalAkhir){

    return await postAPI({

        action:"riwayat",

        user:user,

        tanggalAwal:tanggalAwal,

        tanggalAkhir:tanggalAkhir

    });

}


// ================================================
// DETAIL FOTO
// ================================================

async function getDetail(nis,tanggal){

    return await postAPI({

        action:"detail",

        nis:nis,

        tanggal:tanggal

    });

}