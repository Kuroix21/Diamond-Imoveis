//CODIGOS INCOMPLETOS, SENDO USADOS SÓ PARA TESTAR AS FUNCIONALIDADES BASICAS!!!
function pagloginCadastro() {
    window.location.href = "login";
}

function pagCadastroPropri() {
    window.location.href = "anunciar";
}

function pagAlugar() {
    window.location.href = "alugar";
}

function pagComprar() {
    window.location.href = "comprar";
}

function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }
 
 function dropdown() {
let dropdown = document.querySelector('.dropdown')

    if (dropdown.classList.contains('closed')) {
        dropdown.classList.remove('closed')
      } else {
        dropdown.classList.add('closed')    
      }
 }