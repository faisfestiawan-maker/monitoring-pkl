const https = require("https");

// URL Web App Apps Script
const GAS_URL = "https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";

module.exports = (req, res) => {

    // ============================
    // CORS
    // ============================

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    // ============================
    // BODY
    // ============================

    const body =
        typeof req.body === "string"
            ? req.body
            : JSON.stringify(req.body || {});

    // ============================
    // REQUEST KE APPS SCRIPT
    // ============================

    const gasReq = https.request(
        GAS_URL,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(body)
            }
        },
        (gasRes) => {

            let result = "";

            gasRes.on("data", chunk => {
                result += chunk;
            });

            gasRes.on("end", () => {

                try{

                    res.status(200).json(
                        JSON.parse(result)
                    );

                }catch(err){

                    res.status(500).json({

                        success:false,

                        message:"Response Apps Script tidak valid.",

                        raw:result

                    });

                }

            });

        }
    );

    gasReq.on("error", err => {

        res.status(500).json({

            success:false,

            message:err.message

        });

    });

    gasReq.write(body);

    gasReq.end();

};