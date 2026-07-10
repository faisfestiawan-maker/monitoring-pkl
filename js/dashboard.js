// ======================================================
// DASHBOARD.JS
// ======================================================

let dashboardData = null;
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
        .addEventListener("keyup", filterNama);

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

        renderTable(res.rows);

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

function renderTable(rows){

    const tbody = document.querySelector("#tblMonitoring tbody");

    tbody.innerHTML = "";

    rows.forEach((item,index)=>{

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
onclick="lihatFoto('${item.nis}')">

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

    renderTable(hasil);

}

// ======================================================
// FOTO
// ======================================================

async function lihatFoto(nis){

    try{

        const data = await getDetail(
            nis,
            currentTanggal
        );

        if(!data)return;

        document
            .getElementById("previewFoto")
            .src = data.foto;

        document
            .getElementById("modal")
            .style.display = "flex";

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