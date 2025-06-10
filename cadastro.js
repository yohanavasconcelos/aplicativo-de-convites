var user = { name: null, password:null }
var site = document.getElementById('site');

function cadastro (email, password, name){
    if(!email && password && name) 
        alert('você precisa escrever todos os campos para efetuar seu cadastro');
    return site;
}

module.export = {
    cadastro,
    user
}
