// =====================================================
// LOGIN.JS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    initLogin();

});


// =====================================================
// INITIAL
// =====================================================

function initLogin(){

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){

        window.location.href="dashboard.html";

        return;

    }

    document
        .getElementById("tabGuru")
        .addEventListener("click",showGuru);

    document
        .getElementById("tabOrtu")
        .addEventListener("click",showOrtu);

    document
        .getElementById("btnLoginGuru")
        .addEventListener("click",loginGuruClick);

    document
        .getElementById("btnLoginOrtu")
        .addEventListener("click",loginOrtuClick);

}


// =====================================================
// TAB
// =====================================================

function showGuru(){

    document
        .getElementById("guruForm")
        .style.display="block";

    document
        .getElementById("ortuForm")
        .style.display="none";

    document
        .getElementById("tabGuru")
        .classList.add("active");

    document
        .getElementById("tabOrtu")
        .classList.remove("active");

}


function showOrtu(){

    document
        .getElementById("guruForm")
        .style.display="none";

    document
        .getElementById("ortuForm")
        .style.display="block";

    document
        .getElementById("tabGuru")
        .classList.remove("active");

    document
        .getElementById("tabOrtu")
        .classList.add("active");

}



// =====================================================
// LOADING
// =====================================================

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



// =====================================================
// LOGIN GURU
// =====================================================

async function loginGuruClick(){

    const email=document
        .getElementById("emailGuru")
        .value
        .trim();

    if(email==""){

        alert("Masukkan email.");

        return;

    }

    showLoading();

    try{

        const res=await loginGuru(email);

        hideLoading();

        if(!res.success){

            alert(res.message);

            return;

        }

        localStorage.setItem(

            "user",

            JSON.stringify(res.user)

        );

        location.href="dashboard.html";

    }catch(err){

        hideLoading();

        alert(err.message);

    }

}



// =====================================================
// LOGIN ORTU
// =====================================================

async function loginOrtuClick(){

    const nis=document
        .getElementById("nis")
        .value
        .trim();

    if(nis==""){

        alert("Masukkan NIS.");

        return;

    }

    showLoading();

    try{

        const res=await loginOrtu(nis);

        hideLoading();

        if(!res.success){

            alert(res.message);

            return;

        }

        localStorage.setItem(

            "user",

            JSON.stringify(res.user)

        );

        location.href="dashboard.html";

    }catch(err){

        hideLoading();

        alert(err.message);

    }

}