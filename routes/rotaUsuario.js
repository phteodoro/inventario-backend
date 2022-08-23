const express = require('express');
const router = express.Router();

//para consultar todos os dados
router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem:"AQUI É A LISTA DE USUÁRIOS!",
        nome:"PEDRO TEODORO"
      })
})
//para consultar um determinado cadastro
router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        mensagem:`aqui é a lista de um usuário com id:${id}`,
        nome:"PH"
      })
})
// para enviar dados para salvar no banco
router.post('/',(req,res,next)=>{
            const usuario={
                nome : req.body.nome,
                email : req.body.email,
                senha : req.body.senha
          }
          res.status(201).send({
            mensagem:"Dados Inseridos",
            usuarioCriado:usuario
            
          })
})

module.exports = router;

