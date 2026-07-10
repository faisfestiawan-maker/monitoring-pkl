let dataRiwayat = [];

document.addEventListener("DOMContentLoaded", init);

async function init(){

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){

        location.href="index.html";

        return;

    }

    document.getElementById("namaUser").textContent=user.nama;
    document.getElementById("roleUser").textContent=user.role;

    document
        .getElementById("btnLogout")
        .onclick=logout;

    document
        .getElementById("btnCari")
        .onclick=loadRiwayat;

    document
        .getElementById("closeModal")
        .onclick=closeModal;

    const hariIni=new Date().toISOString().split("T")[0];

    document.getElementById("tglAwal").value=hariIni;
    document.getElementById("tglAkhir").value=hariIni;

    loadRiwayat();

}



async function loadRiwayat(){

    const user=JSON.parse(localStorage.getItem("user"));

    const awal=document.getElementById("tglAwal").value;

    const akhir=document.getElementById("tglAkhir").value;

    showLoading();

    try{

        const res=await getRiwayat(user,awal,akhir);

        hideLoading();

        if(!res.success){

            alert(res.message);

            return;

        }

        dataRiwayat=res.rows;

        renderTable();

    }catch(err){

        hideLoading();

        alert(err.message);

    }

}



function renderTable(){

    const tbody=document.querySelector("#tblRiwayat tbody");

    tbody.innerHTML="";

    dataRiwayat.forEach((item,i)=>{

        tbody.innerHTML+=`

<tr>

<td>${i+1}</td>

<td>${item.tanggal}</td>

<td>${item.jam}</td>

<td>${item.nis}</td>

<td>${item.nama}</td>

<td>${item.kelas}</td>

<td>${item.tempatPKL}</td>

<td>

<span class="status hadir">

${item.status}

</span>

</td>

<td>

<button
class="btn-foto"
onclick="lihatFoto('${item.nis}','${item.tanggal}')">

Lihat

</button>

</td>

</tr>

`;

    });

}



async function lihatFoto(nis, tanggal){

    try{

        const res = await getDetail(nis, tanggal);

        if(!res.success){

            alert(res.message);
            return;

        }

        document.getElementById("previewFoto").src = res.data.foto;

        document.getElementById("modal").style.display = "flex";

    }catch(err){

        alert(err.message);

    }

}



function closeModal(){

    document.getElementById("modal").style.display="none";

}



function logout(){

    localStorage.removeItem("user");

    location.href="index.html";

}



function showLoading(){

    document.getElementById("loading").style.display="flex";

}



function hideLoading(){

    document.getElementById("loading").style.display="none";

}