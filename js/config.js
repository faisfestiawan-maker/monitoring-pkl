// ================================================
// CONFIG.JS - CORS PROXY CONFIGURATION
// ================================================

/**
 * Ada 3 pilihan setup:
 * 
 * 1. GUNAKAN GAS LANGSUNG (Jika akses dari GAS script editor)
 *    - Tidak ada CORS issue
 *    - URL: https://script.google.com/macros/s/{ID}/usercurrentapp
 * 
 * 2. GUNAKAN GITHUB PAGES + VERCEL PROXY (Rekomendasi saat ini)
 *    - Deploy proxy ke Vercel
 *    - Update URL di bawah ke Vercel project URL
 *    - Format: https://YOUR_PROJECT.vercel.app/api/proxy
 * 
 * 3. GUNAKAN CORS ANYWHERE TEMPORARY (Testing only)
 *    - https://cors-anywhere.herokuapp.com/corsproxy?url={URL}
 */

// ================================================
// SETUP INSTRUCTIONS
// ================================================

/*
LANGKAH 1: Deploy Proxy ke Vercel (Recommended)
============================================

a) Pastikan sudah commit file berikut ke repository:
   - api/proxy.js
   - vercel.json
   - package.json

b) Buka https://vercel.com dan login dengan GitHub

c) Klik "New Project" dan select repository "monitoring-pkl"

d) Deploy - Vercel akan otomatis setup dan berikan URL

e) Copy URL project Anda (misal: https://monitoring-pkl-xyz.vercel.app)

f) Update PROXY_URL di bawah dengan URL Vercel Anda + /api/proxy
   Contoh: https://monitoring-pkl-xyz.vercel.app/api/proxy

g) Selesai! GitHub Pages sekarang bisa akses GAS via proxy

LANGKAH 2: Update API URL
============================================
Ganti PROXY_URL di bawah sesuai pilihan setup Anda
*/

// ================================================
// PROXY URL - SESUAIKAN DENGAN SETUP ANDA
// ================================================

// Option 1: Vercel Proxy (RECOMMENDED)
const PROXY_URL = "https://monitoring-pkl.vercel.app";

// Option 2: Local/Development
// const PROXY_URL = "http://localhost:3000/api/proxy";

// Option 3: GAS Direct (No CORS issue tapi hanya jika akses dari GAS)
// const PROXY_URL = "https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";

// ================================================
// AUTO SELECT
// ================================================

function getAPIURL() {
  
  // Jika sedang di localhost, gunakan local proxy
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return "http://localhost:3000/api/proxy";
  }
  
  // Jika PROXY_URL sudah dikonfigurasi, gunakan itu
  if (PROXY_URL && PROXY_URL !== "https://monitoring-pkl.vercel.app/") {
    return PROXY_URL;
  }
  
  // Fallback (akan error - perlu dikonfigurasi)
  console.warn("API_URL belum dikonfigurasi. Update PROXY_URL di config.js");
  return PROXY_URL;
}

const API_URL = getAPIURL();

// Verify configuration
if (API_URL.includes('YOUR_VERCEL')) {
  console.error("❌ API_URL belum dikonfigurasi. Baca petunjuk di config.js");
}
