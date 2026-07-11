// ================================================
// API CONFIGURATION
// ================================================

// See js/config.js untuk setup API URL yang sesuai
// API_URL akan diimport dari config.js


// ================================================
// POST REQUEST
// ================================================

async function callAPI(action, params={}){

    try{

        const payload = Object.assign(
            { action: action },
            params
        );

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
                mode: "cors"
            }
        );

        if(!response.ok){

            throw new Error(
                "HTTP Error : " + response.status
            );

        }

        const result = await response.json();

        return result;

    }catch(err){

        console.error("API Error:", err);

        throw new Error(
            err.message || "Gagal terhubung ke server"
        );

    }

}


// ================================================
// GET REQUEST (LEGACY)
// ================================================

async function getAPI(params){

    try{

        const query = new URLSearchParams(params);

        const response = await fetch(
            API_URL + "?" + query.toString(),
            {
                mode: "cors"
            }
        );

        if(!response.ok){

            throw new Error(
                "HTTP Error : " + response.status
            );

        }

        const result = await response.json();

        return result;

    }catch(err){

        console.error("API Error:", err);

        throw new Error(
            err.message || "Gagal terhubung ke server"
        );

    }

}


// ================================================
// LOGIN GURU
// ================================================

async function loginGuru(email){

    return await callAPI("loginGuru", { email });

}


// ================================================
// LOGIN ORTU
// ================================================

async function loginOrtu(nis){

    return await callAPI("loginOrtu", { nis });

}


// ================================================
// DASHBOARD
// ================================================

async function getDashboard(user,tanggal){

    return await callAPI(

        "dashboard",

        {

            user:user,

            tanggal:tanggal

        }

    );

}


// ================================================
// RIWAYAT
// ================================================

async function getRiwayat(

    user,

    tanggalAwal,

    tanggalAkhir

){

    return await callAPI(

        "riwayat",

        {

            user:user,

            tanggalAwal:tanggalAwal,

            tanggalAkhir:tanggalAkhir

        }

    );

}


// ================================================
// DETAIL FOTO
// ================================================

async function getDetail(nis,tanggal){

    return await callAPI("detail", { nis, tanggal });

}