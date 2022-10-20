const express = require('express');
const router = express.Router();
const mysql = require("../mysql").pool;
const patrimonio =
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
        "SELECT * FROM `patrimonio` ",
        (error,resultado,field)=>{
            conn.release();
            if(error){
                res.status(500).send({
                    error:error,
                    response:null
                })
            }
            res.status(200).send({
                mensagem:"AQUI É A LISTA DE PATRIMÔNIO!",
                patrimonio:resultado
                // usuario:usuario[2].nome
              })
        }     
        )
})
    // res.status(200).send({
    //     mensagem:"AQUI É A LISTA DE PATRIMÔNIO!",
    //     patrimonio:patrimonio
    //     // usuario:usuario[2].nome
    //   })
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    
    const id = req.params.id;
    mysql.getConnection((error,conn)=>{
        conn.query(
            `SELECT * FROM patrimonio WHERE id=${id}` ,
            (error,resultado,field)=>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        response:null
                    })
                }
                res.status(200).send({
                    mensagem:"AQUI É A LISTA DE PATRIMÔNIO!",
                    patrimonio:resultado
                    // usuario:usuario[2].nome
                  })
            }     
            )
    })
    // const id = req.params.id;
    // let listapatrimonio=patrimonio.filter(value=>value.id==id);
    // res.status(200).send({
    //     mensagem:`aqui é a lista de um usuário com id:${id}`,
    //     patrimonio:listapatrimonio
    //   })
})
// para enviar dados para salvar no banco
router.post('/', (req, res, next) => {
  let msg=[];
  let i=0;
  const nome=req.body.nome;

  const patrimonio = {

        nome: req.body.nome,
        
    //   responsavel: req.body.responsavel,
    //   contato: req.body.contato
  }
 
  if(patrimonio.nome.length<3){
      msg.push({mensagem:"campo com menos de 3 caracteres!"})
      i++;
  }

  if(patrimonio.id.length==0){
          msg.push({mensagem:"Id inválido!"})
          i++;
  }
//   if(contato.length==0){
//           msg.push({mensagem:"Contato inválida!"})
//           i++;
//   }
  if(i==0){
    mysql.getConnection((error,conn)=>{
      conn.query(
          "INSERT INTO `patrimonio` (nome) values(?)",
          [nome],
          (error,resultado,field)=>{
              conn.release();
              console.log(error)
              if(error){
                  res.status(500).send({
                      error:error,
                      response:null
                  })
              }
              res.status(201).send({
                  mensagem:"CADASTRO CRIADO COM SUCESSO!",
                  patrimonio:resultado.insertId
                  // usuario:usuario[2].nome
                })
          })
      })  
      // res.status(201).send({
      //     mensagem:"Dados inseridos!",
      //     patrimonioCriado:patrimonio
      // });
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
  // let lista=patrimonio.map(item=>{
  //     // if(item==id){
  //     return(
  //         item.nome=nome,
  //         item.id=id
  //       //   item.contato=contato
  //         )
  // });
//   if(nome.length<3){
//       msg.push({mensagem:"campo com menos de 3 caracteres!"})
//       i++;
//   }

//   if(patrimonio.id.length==0){
//     msg.push({mensagem:"Id inválido!"})
//     i++;
// }
//   if(contato.length==0){

//           msg.push({mensagem:"Contato inválida!"})
//           i++;
//   }
  if(i===0){
    mysql.getConnection((error,conn)=>{
      // console.log(id,nome)
      conn.query(
          "update `patrimonio` set nome=? where id=?",
          [nome,id],
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
                  patrimonio:resultado.insertId
                  // usuario:usuario[2].nome
                })
          })
      })
  } else {
          res.status(400).send({
          mensagem:msg
      })
  }


  // res.status(201).send(
  //     {
  //         mensagem: "Dados alterados com sucesso!!!"
  //     }
  // )
})

router.delete("/:id",(req,res,next)=>{
  const{id}=req.params;
  mysql.getConnection((error,conn)=>{
  conn.query(
    `DELETE FROM patrimonio WHERE id=${id}`,
    (error,resultado,field)=>{
        conn.release();
        if(error){
            res.status(500).send({
                error:error,
                response:null
            })
        }
        res.status(200).send({
            mensagem:"AQUI É A LISTA DE PATRIMÔNIO!",
            patrimonio:resultado
            // usuario:usuario[2].nome
          })
    }     
    )
  })
  });

module.exports = router;