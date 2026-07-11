const https = require('https');
const url = require('url');

// Google Apps Script endpoint
const GAS_URL = "https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";

module.exports = (req, res) => {
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    
    let gasUrl = GAS_URL;
    let gasBody = null;

    if (req.method === 'POST') {
      gasBody = JSON.stringify(req.body);
      gasUrl = GAS_URL; // POST to GAS
    } else {
      // GET request - add query params
      const query = new URLSearchParams(req.query);
      gasUrl = GAS_URL + '?' + query.toString();
    }

    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const gasReq = https.request(gasUrl, options, (gasRes) => {
      let data = '';

      gasRes.on('data', (chunk) => {
        data += chunk;
      });

      gasRes.on('end', () => {
        try {
          const result = JSON.parse(data);
          res.status(200).json(result);
        } catch (e) {
          res.status(200).json({ success: false, message: 'Invalid response from server' });
        }
      });
    });

    gasReq.on('error', (err) => {
      res.status(500).json({ success: false, message: err.message });
    });

    if (gasBody) {
      gasReq.write(gasBody);
    }

    gasReq.end();

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
