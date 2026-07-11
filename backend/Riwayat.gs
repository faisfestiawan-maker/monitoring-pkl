// =====================================================
// RIWAYAT.GS
// =====================================================

function riwayat(req){

    const siswa = getDataSiswa();

    const data = values(SHEET_PRESENSI);
    data.shift();

    let hasil = data.map(r => ({

        tanggal : r[1],
        jam : r[2],
        nis : String(r[3]),
        nama : r[4],
        kelas : r[5],
        tempatPKL : r[6],
        foto : r[8],
        status : r[9],
        keterangan : r[11]

    }));

    // filter sesuai user
    switch(req.user.role){

        case ROLE_GURU:

            const guru = req.user.nama.toLowerCase();

            hasil = hasil.filter(p=>{

                const s = siswa.find(x=>x.nis==p.nis);

                return s &&
                       s.guru.toLowerCase()==guru;

            });

            break;

        case ROLE_ORTU:

            hasil = hasil.filter(p=>
                p.nis==req.user.nis
            );

            break;

        case ROLE_KAJUR:
            break;
    }

    if(req.tanggalAwal){

        hasil = hasil.filter(r=>

            r.tanggal>=req.tanggalAwal &&
            r.tanggal<=req.tanggalAkhir

        );

    }

    return success({

        rows:hasil

    });

}



function riwayatAPI(e){

    const req={

        tanggalAwal:e.parameter.tanggalAwal,

        tanggalAkhir:e.parameter.tanggalAkhir,

        user:{

            role:e.parameter.role,

            nama:e.parameter.nama,

            nis:e.parameter.nis

        }

    };

    return riwayat(req);

}


function filterRiwayatByRole(data,user){

    switch(user.role){

        case ROLE_KAJUR:

            return data;

        case ROLE_GURU:

            const siswaGuru = getDataSiswa()

                .filter(s=>

                    String(s.guru)
                    .trim()
                    .toLowerCase()

                    ==

                    String(user.nama)
                    .trim()
                    .toLowerCase()

                )

                .map(s=>String(s.nis));

            return data.filter(r=>

                siswaGuru.includes(String(r[3]))

            );

        case ROLE_ORTU:

            return data.filter(r=>

                String(r[3]) == String(user.nis)

            );

        default:

            return [];

    }

}




