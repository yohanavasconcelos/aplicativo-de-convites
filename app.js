import login from './login.js';
import cadastro from './cadastro.js';
import express from 'express';

const app = express();
const botao = document.querySelector('a');


function acessarConvites() {
    app.get('/', function(req,res){
        res.sendFile(__dirname + './convites.html')
    })
}
botao.addEventListener('click', acessarConvites)
