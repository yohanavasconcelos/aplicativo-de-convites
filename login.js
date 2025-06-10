const {cadastro} = require('./cadastro.js');
var iniciar = document.getElementById('bem-vindo');
iniciar = 'Seja bem-vindo ao nosso aplicativo' + user;

function login(name, password) {
    if(!name && !password) alert('precisa completar todos os campos');
    if (!cadastro) alert('você precisa fazer um cadastro no aplicativo');
    return iniciar;
}

module.export = {  
    login
} 
