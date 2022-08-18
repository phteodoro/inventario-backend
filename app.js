const express = require("express");
const app     = express();

app.use("/listauruarios",(req,res,next)=>{
    console.log("Passei aqui");
    res.status(200).send({
        mensagem:"Deu certo, graças a DEUS!",
        nome:"PH do poc"  
    })
});

module.exports = app