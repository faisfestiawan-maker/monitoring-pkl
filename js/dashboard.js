// ======================================================
// DASHBOARD.JS
// ======================================================

let dashboardData = null;
let dataAsli=[];
let currentTanggal = "";

// ======================================================
// INITIAL
// ======================================================

document.addEventListener("DOMContentLoaded", initDashboard);

async function initDashboard(){

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){

        location.href="index.html";
        return;

    }

    tampilkanUser(user);

    const hariIni = new Date().toISOString().split("T")[0];

    document.getElementById("tanggal").value = hariIni;

    document
        .getElementById("tanggal")
        .addEventListener("change", loadDashboard);

    document
    .getElementById("search")
    .addEventListener("input",prosesData);

    document
    .getElementById("filterGuru")
    .onchange=prosesData;

    document
    .getElementById("filterKelas")
    .onchange=prosesData;

    document
    .getElementById("filterTempat")
    .onchange=prosesData;

    document
    .getElementById("filterStatus")
    .onchange=prosesData;

    document
    .getElementById("sortData")
    .onchange=prosesData;

    document
        .getElementById("btnLogout")
        .addEventListener("click", logout);

    document
        .getElementById("closeModal")
        .addEventListener("click", closeModal);

    loadDashboard();

}

// ======================================================
// USER
// ======================================================

function tampilkanUser(user){

    document.getElementById("namaUser").textContent = user.nama;

    document.getElementById("roleUser").textContent = user.role;

}

// ======================================================
// LOAD DASHBOARD
// ======================================================

async function loadDashboard(){

    const user = JSON.parse(localStorage.getItem("user"));

    const tanggal = document.getElementById("tanggal").value;

    currentTanggal = tanggal;

    showLoading();

    try{

        const res = await getDashboard(user,tanggal);

        hideLoading();

        if(!res.success){

            alert(res.message);
            return;

        }

        dashboardData = res;

        updateSummary(res.summary);

        dataAsli = res.rows;

        isiSemuaFilter();

        prosesData();

    }catch(err){

        hideLoading();

        alert(err.message);

    }

}

// ======================================================
// SUMMARY
// ======================================================

function updateSummary(summary){

    document.getElementById("total").textContent = summary.total;

    document.getElementById("hadir").textContent = summary.hadir;

    document.getElementById("belum").textContent = summary.belum;

    if(document.getElementById("persen")){

        const p = summary.total === 0
            ? 0
            : Math.round(summary.hadir * 100 / summary.total);

        document.getElementById("persen").textContent = p + "%";

    }

}

// ======================================================
// TABLE
// ======================================================

function renderTable(){

    const tbody = document.querySelector("#tblMonitoring tbody");

    tbody.innerHTML = "";

    dataDashboard.forEach((item,index)=>{

        const statusClass =
            item.status==="HADIR"
            ? "hadir"
            : "belum";

        tbody.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${item.nis}</td>

<td>${item.nama}</td>

<td>${item.kelas}</td>

<td>${item.tempatPKL}</td>

<td>${item.guru}</td>

<td>${item.jam}</td>

<td>

<span class="status ${statusClass}">
${item.status}
</span>

</td>

<td>

${
item.foto
?

`<button
class="btn-foto"
onclick="lihatFoto('${item.nis}','${item.tanggal}')">

Lihat

</button>`

:

"-"

}

</td>

</tr>

`;

    });

}

// ======================================================
// FILTER
// ======================================================

function filterNama(){

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const hasil = dashboardData.rows.filter(item=>

        item.nama.toLowerCase().includes(keyword)

    );

    renderTable();

}

// ======================================================
// FOTO
// ======================================================

async function lihatFoto(nis){

    try{

        const res = await getDetail(
            nis,
            currentTanggal
        );

        console.log(res);

        if(!res.success){

            alert(res.message);
            return;

        }

        document.getElementById("previewFoto").src = res.foto;

        document.getElementById("modal").style.display = "flex";

    }catch(err){

        alert(err.message);

    }

}

function closeModal(){

    document
        .getElementById("modal")
        .style.display = "none";

}

// ======================================================
// LOGOUT
// ======================================================

function logout(){

    localStorage.removeItem("user");

    location.href="index.html";

}

// ======================================================
// LOADING
// ======================================================

function showLoading(){

    document
        .getElementById("loading")
        .style.display="flex";

}

function hideLoading(){

    document
        .getElementById("loading")
        .style.display="none";

}

function isiSemuaFilter(){

    isiFilter("filterGuru","guru");

    isiFilter("filterKelas","kelas");

    isiFilter("filterTempat","tempatPKL");

}

function isiFilter(id,field){

    const select=document.getElementById(id);

    const old=select.value;

    select.innerHTML="<option value=''>Semua</option>";

    const list=[

        ...new Set(

            dataAsli.map(x=>x[field])

        )

    ].sort();

    list.forEach(v=>{

        select.innerHTML+=

        `<option>${v}</option>`;

    });

    select.value=old;

}

function prosesData(){

    let hasil=[...dataAsli];

    hasil=filterCari(hasil);

    hasil=filterDropdown(hasil);

    hasil=urutkan(hasil);

    dataDashboard=hasil;

    renderTable();

}

function filterCari(data){

    const key=document
    .getElementById("search")
    .value
    .trim()
    .toLowerCase();

    if(key=="") return data;

    return data.filter(r=>

        String(r.nis).toLowerCase().includes(key)

        ||

        r.nama.toLowerCase().includes(key)

        ||

        r.guru.toLowerCase().includes(key)

        ||

        r.kelas.toLowerCase().includes(key)

        ||

        r.tempatPKL.toLowerCase().includes(key)

    );

}

function filterDropdown(data){

    const guru=document.getElementById("filterGuru").value;

    const kelas=document.getElementById("filterKelas").value;

    const tempat=document.getElementById("filterTempat").value;

    const status=document.getElementById("filterStatus").value;

    return data.filter(r=>{

        return (

            (!guru || r.guru==guru)

            &&

            (!kelas || r.kelas==kelas)

            &&

            (!tempat || r.tempatPKL==tempat)

            &&

            (!status || r.status==status)

        );

    });

}


function urutkan(data){

    const sort=document
    .getElementById("sortData")
    .value;

    switch(sort){

        case "namaAsc":

            data.sort((a,b)=>a.nama.localeCompare(b.nama));

            break;

        case "namaDesc":

            data.sort((a,b)=>b.nama.localeCompare(a.nama));

            break;

        case "guruAsc":

            data.sort((a,b)=>a.guru.localeCompare(b.guru));

            break;

        case "guruDesc":

            data.sort((a,b)=>b.guru.localeCompare(a.guru));

            break;

        case "kelasAsc":

            data.sort((a,b)=>a.kelas.localeCompare(b.kelas));

            break;

        case "kelasDesc":

            data.sort((a,b)=>b.kelas.localeCompare(a.kelas));

            break;

        case "tempatAsc":

            data.sort((a,b)=>a.tempatPKL.localeCompare(b.tempatPKL));

            break;

        case "tempatDesc":

            data.sort((a,b)=>b.tempatPKL.localeCompare(a.tempatPKL));

            break;

        case "statusAsc":

            data.sort((a,b)=>a.status.localeCompare(b.status));

            break;

    }

    return data;

}


