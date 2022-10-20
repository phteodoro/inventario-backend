const express = require('express');
const { response } = require('../app');
const router = express.Router();
const mysql = require("../mysql").pool;
const setor =
[
  {
      "id":1,
      "nome":"Carlos", 
    //   "email":"sousamacedo18@gmail.com",
    //   "senha":"123"
  },
  {
      "id":2,
      "nome":"Pedro",
    //   "email":"pedro@gmail.com",
    //   "senha":"123"
  },
  {
      "id":3,
      "nome":"João Neto",
    //   "email":"joaoneto@gmail.com",
    //   "senha":"123"  
  }, 
  {
      "id":4,
      "nome":"Iarly",
    //   "email":"iarly@gmail.com",
    //   "senha":"123"  
  }, 
  {
      "id":5,
      "nome":"Guimas",
    //   "email":"guimaraes@gmail.com",
    //   "senha":"123"  
  }, 
  {
      "id":6,
      "nome":"Filipe",
    //   "email":"filipe@gmail.com",
    //   "senha":"123"  
  }, 
  {
      "id":7,
      "nome":"Ray",
    //   "email":"ray@gmail.com",
    //   "senha":"123"  
  }, 
  {
      "id":8,
      "nome":"Max",
    //   "email":"max@gmail.com",
    //   "senha":"123"  
  }, 
  {
      "id":9,
      "nome":"Gabriela",
    //   "email":"gabriela@gmail.com",
    //   "senha":"123"  
  } 
]

function validacaoEmail(email){
  var re=/\S+@\S+\.\S+/;
  return re.test(email);
}
//para consultar todos os dados
router.get('/',(req,res,next)=>{
  mysql.getConnection((error,conn)=>{
    conn.query(
        "SELECT * FROM `setor` ",
        (error,resultado,field)=>{
            conn.release();
            if(error){
                res.status(500).send({
                    error:error,
                    response:null
                })
            }
            res.status(200).send({
                mensagem:"AQUI É A LISTA DE SETOR!",
                setor:resultado
                // usuario:usuario[2].nome
              })
        }     
        )
})
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    mysql.getConnection((error,conn)=>{
      conn.query(
          "SELECT * FROM `setor` WHERE id=?",[id],
          (error,resultado,field)=>{
              conn.release();
              if(error){
                  res.status(500).send({
                      error:error,
                      response:null
                  })
              }
              res.status(200).send({
                  mensagem:"AQUI É A LISTA DE SETOR!",
                  setor:resultado
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

  const setor = {

        nome: req.body.nome,
        id: req.body.nome
    //   responsavel: req.body.responsavel,
    //   contato: req.body.contato
  }
  if(setor.nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
  }

  if(setor.id.length==0){
          msg.push({mensagem:"Id inválido!"})
          i++;
  }
//   if(contato.length==0){
//           msg.push({mensagem:"Contato inválida!"})
//           i++;
//   }
  if(i==0){
      // res.status(201).send({
      //     mensagem:"Dados inseridos!",
      //     setorCriado:setor
      // });
      mysql.getConnection((error,conn)=>{
        conn.query(
            "INSERT INTO `setor` (nome) values(?)",
            [setor.nome],
            (error,resultado,field)=>{
                conn.release();
                console.log(setor)
                if(error){
                    res.status(500).send({
                        error:error,
                        response:null
                    })
                }
                res.status(201).send({
                    mensagem:"CADASTRO CRIADO COM SUCESSO!",
                    setor:resultado.insertId
                    // usuario:usuario[2].nome
                  })
            })
        }) 
  } else {
          res.status(400).send({
          mensagem:msg
      })
  }

}
)

router.patch('/', (req, res, next) => {
  let msg=[];
  let i=0;
  const { id, nome } = req.body;

  // let lista=setor.map(item=>{
  //     // if(item==id){
  //     return(
  //         item.nome=nome,
  //         item.id=id
  //       //   item.contato=contato
  //         )
  // });
  // if(nome.length<3){
  //     msg.push({mensagem:"campo com menos de 3 caracteres!"})
  //     i++;
  // }

  // if(validacaoId(setor)==false){

  //         msg.push({mensagem:"Id inválido!"})
  //         i++;
  // }
//   if(contato.length==0){

//           msg.push({mensagem:"Contato inválida!"})
//           i++;
//   }

  if(i==0){
    
      mysql.getConnection((error,conn)=>{
        conn.query(
            "update `setor` set nome=? where id=?",
            [nome,id],
            (error,resultado,field)=>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        response:error
                    })
                }
                res.status(201).send({
                    mensagem:"CADASTRO DA LISTA SETOR ALTERADO COM SUCESSO!",
                    // usuario:usuario[2].nome
                  })
            })
        })
  } else {
          res.status(400).send({
          mensagem:msg
      })
  }
})

router.delete("/:id",(req,res,next)=>{
  const{id}=req.params;
  //     let dadosdeletados=setor.filter(value=>value.id==id);
  //     let listasetor=setor.filter(value=>value.id!=id);
  //   res.status(201).send({
  //     mensagem:"Dados deletados com sucesso",
  //     dadosnovos:listasetor,
  //     deletados:dadosdeletados
  // })
  mysql.getConnection((error,conn)=>{
    conn.query(
        `DELETE FROM setor WHERE id=${id}`,
        (error,resultado,field)=>{
            conn.release();
            if(error){
                res.status(500).send({
                    error:error,
                    response:null
                })
            }
            res.status(200).send({
                mensagem:"AQUI É A LISTA DE DELETAR DA LISTA SETOR!",
                setor:resultado
                // usuario:usuario[2].nome
              })
        }     
        )
})
});

module.exports = router;