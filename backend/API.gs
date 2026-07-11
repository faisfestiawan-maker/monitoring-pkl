function apiLoginGuru(email){

  email = String(email).trim().toLowerCase();

  const sheet = getSpreadsheet()
      .getSheetByName("Admin");

  const data = sheet.getDataRange().getValues();

  for(let i=1;i<data.length;i++){

      if(String(data[i][1]).toLowerCase()==email){

          return{

              success:true,

              user:{
                  role:data[i][2],
                  nama:data[i][0],
                  email:data[i][1]
              }

          };

      }

  }

  return{

      success:false,
      message:"Email tidak terdaftar"

  };

}


function apiLoginOrtu(nis){

    nis=String(nis);

    const siswa=getDataSiswa();

    const anak=siswa.find(s=>String(s.nis)==nis);

    if(!anak){

        return{

            success:false,
            message:"NIS tidak ditemukan"

        };

    }

    return{

        success:true,

        user:{

            role:"Ortu",

            nis:anak.nis,

            nama:anak.nama,

            kelas:anak.kelas

        }

    };

}