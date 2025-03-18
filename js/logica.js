let listaDeNumerosSorteados = [];
let numeroLimite = 20;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
 
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}
 
function verificarChute() {
    let chute = document.querySelector('.entrada-numero').value;
    console.log(numeroSecreto);
 
    if (chute < 1 || chute > 20) {
        exibirTextoNaTela('p', 'Por favor, insira um número entre 1 e 20.');
        return;
    }
 
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', 'Meus parabéns, clique em novo jogo e volte a brincar!');
        document.getElementById('botao-reiniciar').removeAttribute('disabled');
        document.getElementById('botao-chutar').setAttribute('disabled', true);
 
    } else if (tentativas == 3) {
        exibirTextoNaTela('h1', 'Errou! Número máximo de tentativas é 3');
        exibirTextoNaTela('p', 'O número secreto era: ' + numeroSecreto);
        document.getElementById('botao-reiniciar').removeAttribute('disabled');
        document.getElementById('botao-chutar').setAttribute('disabled', true);
 
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}
 
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
 
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}
 
function limparCampo() {
    let chute = document.querySelector('.entrada-numero');
    chute.value = '';
}
 
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoNaTela('h1', 'Adivinhe o <span class="texto-destaque">número secreto</span>');
    exibirTextoNaTela('p', 'Escolha um número entre 1 a 20');
    document.getElementById('botao-reiniciar').setAttribute('disabled', true);
    document.getElementById('botao-chutar').removeAttribute('disabled'); // Habilita o campo de entrada
}

