const express = require("express");
const app     = express();

app.use("/listausuarios",(req,res,next)=>
{
    res.status(200).send({
        mensagem:"Deu certo, graças a DEUS!",
        nome:"PH do poc"  
    })
});

app.use((req,res,next)=>
{
        const erro = new Error ("Não encontramos uma rota!");
        erro.status(404);
        next(erro);
});

app.use((error,req,res,next)=>
{
    res.status(error.status || 500);
        return res.jsons({
            erro:{
                mensagem: error.message ,
                
            }
        })
});

// app.use("/listapatrimonios",(req,res,next)=>{

//     res.status(200).send({
//         mensagem:"Aqui é a lista de patrimônio.",
//         nome: "JUREMA"
//     })
// });

// app.use("/somar",(req,res,next)=>{
//     const a=2;
//     const b=5;
//     let total=0;
//     total=a+b;
//         res.status(200).send(
//             {
//                 total:total       
//             })
// });

// app.use("/resultado",(req,res,next)=>{
//     const a=10, b=0, c=8, d=10;
//     let   media    = 0;
//     let   situacao = "";
//     let   total    = 0;
//       total = a + b + c + d
//       media = total/4
//         if(media<7){
//             situacao="Reprovado"
//         }else{
//             situacao="Aprovado"
//         }
//         console.log(total);
//             res.status(200).send(
//             {
//                 nome:"PH Teodoro",
//                 nota1: a ,
//                 nota2: b ,
//                 nota3: c ,
//                 nota4: d ,
//                 resultado: total ,
//                 media:     media ,
//                 situacao:  situacao
//             })
// });
module.exports = app