// =====================================================
// DASHBOARD.GS
// =====================================================

function dashboardAPI(e){

    const req={

        tanggal:e.parameter.tanggal,

        user:{

            role:e.parameter.role,

            nama:e.parameter.nama,

            nis:e.parameter.nis

        }

    };

    return dashboard(req);

}


function getDataSiswa(){

    const data = values(SHEET_SISWA);

    data.shift();

    return data

        .filter(r=>

            String(r[4]).toUpperCase()=="YA"

        )

        .map(r=>({

            nis : String(r[0]),

            nama : r[1],

            kelas : r[2],

            tempatPKL : r[3],

            guru : r[5],

            hp : r[6]

        }));

}


function getPresensi(tanggal){

    const data = values(SHEET_PRESENSI);

    data.shift();

    return data

        .filter(r=>String(r[1])==tanggal)

        .map(r=>({

            timestamp : r[0],

            tanggal : r[1],

            jam : r[2],

            nis : String(r[3]),

            foto : r[8],

            status : r[9]

        }));

}


function mergeData(siswa,presensi){

    const map={};

    presensi.forEach(p=>{

        map[p.nis]=p;

    });

    return siswa.map(s=>{

        const p=map[s.nis];

        return {

            nis: s.nis,

            nama: s.nama,

            kelas: s.kelas,

            tempatPKL: s.tempatPKL,

            guru: s.guru,

            jam: p ? p.jam : "-",

            status: p ? p.status : "BELUM",

            foto: p ? p.foto : ""

        };

    });

}


function filterRole(data,user){

    switch(user.role){

        case ROLE_KAJUR:

            return data;

        case ROLE_GURU:

            Logger.log("===== FILTER GURU =====");
            Logger.log("LOGIN : " + user.nama);

            data.forEach(r => {

                Logger.log("DATA  : " + r.guru);

            });

            return data.filter(r =>

                String(r.guru).trim().toLowerCase() ===
                String(user.nama).trim().toLowerCase()

            );

        case ROLE_ORTU:

            return data.filter(r=>

                String(r.nis)==String(user.nis)

            );

        default:

            return [];

    }

}


function summary(rows){

    const s={

        total:rows.length,

        hadir:0,

        belum:0

    };

    rows.forEach(r=>{

        if(r.status=="HADIR"){

            s.hadir++;

        }else{

            s.belum++;

        }

    });

    return s;

}


function dashboard(req){

    const tanggal = req.tanggal;

    const user = req.user;

    const siswa = getDataSiswa();

    const presensi = getPresensi(tanggal);

    let rows = mergeData(siswa, presensi);

    rows = filterRole(rows, user);

    return {

        success: true,

        tanggal: tanggal,

        rows: rows,

        summary: summary(rows)

    };

}