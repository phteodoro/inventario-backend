const express = require('express');
const { response } = require('../app');
const router = express.Router();
const mysql = require("../mysql").pool;
const empresa =
[
  {
      "id":1,
      "nome":"Carlos", 
      "responsavel":"sousamacedo18@gmail.com",
      "contato":"123"
  },
  {
      "id":2,
      "nome":"Pedro",
      "responsavel":"pedro@gmail.com",
      "contato":"123"
  },
  {
      "id":3,
      "nome":"João Neto",
      "responsavel":"joaoneto@gmail.com",
      "contato":"123"  
  }, 
  {
      "id":4,
      "nome":"Iarly",
      "responsavel":"iarly@gmail.com",
      "contato":"123"  
  }, 
  {
      "id":5,
      "nome":"Guimas",
      "responsavel":"guimaraes@gmail.com",
      "contato":"123"  
  }, 
  {
      "id":6,
      "nome":"Filipe",
      "responsavel":"filipe@gmail.com",
      "contato":"123"  
  }, 
  {
      "id":7,
      "nome":"Ray",
      "responsavel":"ray@gmail.com",
      "contato":"123"  
  }, 
  {
      "id":8,
      "nome":"Max",
      "responsavel":"max@gmail.com",
      "contato":"123"  
  }, 
  {
      "id":9,
      "nome":"Gabriela",
      "responsavel":"gabriela@gmail.com",
      "contato":"123"  
  } 
]

function validacaoEmail(email){
  var re=/\S+@\S+\.\S+/;
  return re.test(email);
}
//para consultar todos os dados
// router.get('/',(req,res,next)=>{
//     res.status(200).send({
//         mensagem:"AQUI É A LISTA DE EMPRESA!",
//         empresa:empresa
//         // usuario:usuario[2].nome
//       })
// })
router.get('/',(req,res,next)=>{
    mysql.getConnection((error,conn)=>{
        conn.query(
            "SELECT * FROM `empresa` ",
            (error,resultado,field)=>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        response:null
                    })
                }
                res.status(200).send({
                    mensagem:"AQUI É A LISTA DE EMPRESA!",
                    empresa:resultado
                    // usuario:usuario[2].nome
                  })
            }     
            )
    })
    
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    // let listaempresa=empresa.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem:`aqui é a lista de um usuário com id:${id}`,
    //     empresa:listaempresa
    //   })
    mysql.getConnection((error,conn)=>{
        conn.query(
            `SELECT * FROM empresa where id = ${id}` ,
            (error,resultado,field)=>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        response:null
                    })
                }
                res.status(200).send({
                    mensagem:"AQUI É A LISTA DE EMPRESA!",
                    empresa:resultado
                    // usuario:usuario[2].nome
                  })
            }     
            )
    })
})
// para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
  let msg=[];
  let i=0;

  const empresa = {
      nome: req.body.nome,
      responsavel: req.body.responsavel,
      contato: req.body.contato
  }
  if(empresa.nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
  }

  if(empresa.responsavel.length==0){

    msg.push({mensagem:"Responsavel inválido!"})
    i++;
}
  if(empresa.contato.length==0){
          msg.push({mensagem:"Contato inválida!"})
          i++;
  }
  if(i==0){
    mysql.getConnection((error,conn)=>{
        conn.query(
            "INSERT INTO `empresa` (nome,responsavel,contato) values(?,?,?)",
            [empresa.nome,empresa.responsavel,empresa.contato],
            (error,resultado,field)=>{
                conn.release();
                console.log(empresa)
                if(error){
                    res.status(500).send({
                        error:error,
                        response:null
                    })
                }
                res.status(201).send({
                    mensagem:"CADASTRO CRIADO COM SUCESSO!",
                    empresa:resultado.insertId
                    // usuario:usuario[2].nome
                  })
            })
        })
  } else {
          res.status(500).send({
          mensagem:msg
      })
  }

}
)

router.patch('/', (req, res, next) => {
  let msg=[];
  let i=0;
  const { id, nome, responsavel, contato } = req.body;

//   let lista=empresa.map(item=>{
//       // if(item==id){
//       return(
//           item.nome=nome,
//           item.responsavel=responsavel,
//           item.contato=contato
//           )
//   });
  if(nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
  }
  if(responsavel.length==0){
          msg.push({mensagem:"Responsavel inválido!"})
          i++;
  }
  if(contato.length==0){
          msg.push({mensagem:"Contato inválida!"})
          i++;
  }
  if(i==0){
    mysql.getConnection((error,conn)=>{
        conn.query(
            "update `empresa` set nome=?,responsavel=?,contato=? where id=?",
            [nome,responsavel,contato,id],
            (error,resultado,field)=>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        response:null
                    })
                }
                res.status(201).send({
                    mensagem:"CADASTRO ALTERADO COM SUCESSO!",
                    empresa:resultado.insertId
                    // empresa:empresa[2].nome
                  })
            })
        })
  } else {
          res.status(400).send({
          mensagem:msg
      })
  }

})

// router.delete("/:id",(req,res,next)=>{
//   const{id}=req.params;
//       let dadosdeletados=empresa.filter(value=>value.id==id);
//       let listaempresa=empresa.filter(value=>value.id!=id);
//     res.status(201).send({
//       mensagem:"Dados deletados com sucesso",
//       dadosnovos:listaempresa,
//       deletados:dadosdeletados
//   })
router.delete("/:id",(req,res,next)=>{
const{id}=req.params;
  mysql.getConnection((error,conn)=>{
      conn.query(
          `DELETE FROM empresa WHERE id=${id}`,
          (error,resultado,field)=>{
              conn.release();
              if(error){
                  res.status(500).send({
                      error:error,
                      response:null
                  })
              }
              res.status(200).send({
                  mensagem:"AQUI É A LISTA DE EMPRESA!",
                  empresa:resultado
                  // usuario:usuario[2].nome
                })
          }     
          )
  })

});

module.exports = router;