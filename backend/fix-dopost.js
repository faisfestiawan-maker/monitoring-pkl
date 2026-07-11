const fs = require('fs');
let content = fs.readFileSync('doPost.gs', 'utf8');

// Replace the apiDashboard call to build user object first
content = content.replace(
  'case "dashboard":\n        result = apiDashboard(req.user, req.tanggal);\n        break;',
  'case "dashboard":\n        const user = { role: req.role || "", nama: req.nama || "", nis: req.nis || "", email: req.email || "" };\n        result = apiDashboard(user, req.tanggal);\n        break;'
);

// Fix riwayat call to pass additional parameters
content = content.replace(
  'case "riwayat":\n        result = apiRiwayat(req.user);\n        break;',
  'case "riwayat":\n        result = apiRiwayat(user, req.tanggalAwal, req.tanggalAkhir);\n        break;'
);

fs.writeFileSync('doPost.gs', content);
console.log('Fixed doPost.gs');
