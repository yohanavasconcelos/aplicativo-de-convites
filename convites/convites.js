document.addEventListener('DOMContentLoaded', () => {
     const body = document.body;
     const corOriginal = getComputedStyle(body).borderColor;

     window.mudarCorBorda = function (cor){
          body.style.borderColor = cor;
     }

     window.voltarCor = function (){
          body.style.borderColor = corOriginal; 
     }
});



