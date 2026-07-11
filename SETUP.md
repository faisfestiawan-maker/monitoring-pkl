# Setup Monitoring PKL - GitHub Pages + Vercel Proxy

Aplikasi ini menggunakan GitHub Pages untuk hosting frontend dan Vercel untuk proxy CORS agar bisa berkomunikasi dengan Google Apps Script.

## 📋 Arsitektur

```
GitHub Pages (Frontend)
    ↓
Vercel Proxy (/api/proxy)
    ↓
Google Apps Script (Backend)
```

## 🚀 Setup Step-by-Step

### Step 1: Setup Vercel Proxy (Sekali saja)

#### 1a. Pastikan Repository Sudah Siap

Verifikasi file berikut sudah ada di root repository:
```
✓ api/proxy.js
✓ vercel.json  
✓ package.json
✓ js/config.js
```

#### 1b. Deploy ke Vercel

1. Buka https://vercel.com
2. Klik **"New Project"**
3. Import repository `monitoring-pkl`
4. Klik **"Deploy"**
5. Tunggu hingga selesai, Vercel akan memberi URL seperti:
   ```
   https://monitoring-pkl-abc123.vercel.app
   ```

#### 1c. Update Config

Edit file `js/config.js`:

```javascript
// Ubah baris ini:
const PROXY_URL = "https://YOUR_VERCEL_PROJECT.vercel.app/api/proxy";

// Menjadi:
const PROXY_URL = "https://monitoring-pkl-abc123.vercel.app/api/proxy";
```

### Step 2: Update GitHub Pages

1. Commit perubahan ke GitHub:
   ```bash
   git add .
   git commit -m "Setup CORS proxy untuk production"
   git push origin main
   ```

2. Verifikasi GitHub Pages sudah aktif:
   - Settings → Pages
   - Source: main branch → root folder
   - URL akan terlihat seperti: `https://faisfestiawan-maker.github.io/monitoring-pkl/`

### Step 3: Selesai!

Sekarang login page sudah bisa akses backend tanpa CORS error.

## 🧪 Testing

### Test Proxy Connection

Buka browser console dan jalankan:
```javascript
// Test POST request
fetch('https://YOUR_VERCEL_PROJECT.vercel.app/api/proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'dashboard', role: 'Ortu', nis: '26101' })
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error(e));
```

### Test Login

1. Buka: `https://YOUR_USERNAME.github.io/monitoring-pkl/`
2. Login dengan NIS: `26101` (Parent/Orang Tua)
3. Seharusnya berhasil login tanpa CORS error

## 🔧 Troubleshooting

### ❌ Error: "Gagal terhubung ke server"

**Solusi:**
1. Cek `js/config.js` - pastikan PROXY_URL benar
2. Verifikasi Vercel project sudah deploy (cek di vercel.com)
3. Clear browser cache: Ctrl+Shift+Delete → Clear all

### ❌ Error: "API_URL belum dikonfigurasi"

**Solusi:**
- Edit `js/config.js` dan ganti `YOUR_VERCEL_PROJECT` dengan nama project Vercel Anda

### ❌ 404 Error dari Vercel

**Solusi:**
- Cek URL proxy di console (DevTools → Network)
- Pastikan `vercel.json` benar dengan routing `/api/proxy`

## 📝 File Configuration

### js/config.js
- Defines API_URL yang digunakan
- Auto-detect environment (local vs production)

### vercel.json
- Konfigurasi routing untuk Vercel
- Map `/api/proxy` ke `api/proxy.js`

### api/proxy.js
- Serverless function yang forward request ke GAS
- Handle CORS headers

## 🌐 Alternative Setup (Jika tidak pakai Vercel)

### Gunakan Netlify Functions
```bash
# Install
npm install netlify-cli -g

# Deploy
netlify deploy
```

### Gunakan Railway.app
Sama seperti Vercel, tinggal connect GitHub repository.

## 📞 Support

Jika masih error, check:
1. Console browser (F12 → Console tab)
2. Network tab untuk melihat request/response
3. Vercel logs: https://vercel.com/dashboard/deployments

---

**Happy coding! 🎉**
