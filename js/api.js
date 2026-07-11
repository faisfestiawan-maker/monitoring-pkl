// ================================================
// API CONFIGURATION
// ================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";


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

    return await callAPI("dashboard", {
        tanggal,
        role: user.role,
        nama: user.nama || "",
        nis: user.nis || ""
    });

}


// ================================================
// RIWAYAT
// ================================================

async function getRiwayat(user,tanggalAwal,tanggalAkhir){

    return await callAPI("riwayat", {
        tanggalAwal,
        tanggalAkhir,
        role: user.role,
        nama: user.nama || "",
        nis: user.nis || ""
    });

}


// ================================================
// DETAIL FOTO
// ================================================

async function getDetail(nis,tanggal){

    return await callAPI("detail", { nis, tanggal });

}