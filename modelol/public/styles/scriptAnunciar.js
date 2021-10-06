//CODIGOS INCOMPLETOS, SENDO USADOS SÓ PARA TESTAR AS FUNCIONALIDADES BASICAS!!!
function pagCadastroPropri() {
    window.location.href = "anunciar";
}

function pagloginCadastro() {
window.location.href = "login";
}

function cadastroConcluido(){
    window.alert("Propriedade cadastrada com sucesso");
    
}

function pagAlugar() {
    window.location.href = "alugar";
}

function pagComprar() {
    window.location.href = "comprar";
}

//Upload das imagens 

//IIFE Immediately Invoked Function Expression
;(function(){

    //Pega os elementos da tela e declara como constantes
    const leitorDeArquivos = new FileReader(),
            formulario = document.querySelector('.upload-imagem'),
            previaDaImagem = document.querySelector('.imagem'),
            inputArquivo = document.querySelector('.upload'),
            btnAtualiza = document.querySelector('.btnAtualiza');

    
    function leEAtualiza(){
        //pega o arquivo enviado e guarda nesta variavel
        let imagemEnviada = inputArquivo.files[0];

        //Usa a função do objeto leitor de arquivos, que lê o arquivo, e consegue reaproveita-lo para usar o arquivo como uma URL
        leitorDeArquivos.readAsDataURL(imagemEnviada);
        
        //Após leitura da imagem (evento load), a função de callback define o valor do src da imagem de prévia com o valor do resultado da leitura do leitor de arquivos
        leitorDeArquivos.addEventListener('loadend', function(load){
            
            //veja no console o que o resultado do leitor de arquivos :)
            console.log(load.target.result);
            //define o caminho da imagem com o caminho criado pelo leitor de arquivos
            previaDaImagem.src = load.target.result
        })
    }

    //Quando o formulário for enviado:
    formulario.addEventListener('submit', function(submit){
        //empede o recarregamento da página
        submit.preventDefault();

        leEAtualiza();
    })
})();

const form = document.getElementById('formulario');
    form.addEventListener('submit', function(e) {
    e.preventDefault();
    const [quartos,vagas, comodos, banheiros, metros, rua, bairro, estado, whats, mail ] = ['quartos','vagas', 'comodos', 'banheiros', 'metros', 'rua', 'bairro', 'estado', 'whats', 'mail'].map(
    name => form.querySelector(`[name="${name}"]`).value
  );
  alert(`${quartos}, ${vagas} - ${comodos}`);
});