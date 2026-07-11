// ======================================================
// VERCEL PROXY
// ======================================================

const GAS_URL =
"https://script.google.com/macros/s/AKfycbyVz29d1-JQuyiXpFI-9xmOtg9M7Yi8aRGL8Hyy_VPuTP4JJG0Oitl_b4w3X0TiCeYu/exec";

module.exports = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if(req.method==="OPTIONS"){

        return res.status(200).end();

    }

    if(req.method!=="POST"){

        return res.status(405).json({

            success:false,

            message:"Method not allowed"

        });

    }

    try{

        console.log("===== REQUEST =====");
        console.log(req.body);

        const response = await fetch(

            GAS_URL,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(req.body),

                redirect:"follow"

            }

        );

        const text = await response.text();

        console.log("STATUS :", response.status);
        console.log("TEXT :", text);

        return res.status(200).send(text);

        console.log("===== RESPONSE GAS =====");
        console.log(text);

        catch(err){

            return res.status(500).json({

                success:false,

                message:"Apps Script tidak mengembalikan JSON",

                raw:text

            });

        }

    }catch(err){

        console.error(err);

        return res.status(500).json({

            success:false,

            message:err.toString()

        });

    }

};