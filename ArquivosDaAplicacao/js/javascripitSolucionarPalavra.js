function SolucionarPalavra() { // Função que verifica se a palvra digitada na solução for certa
    if ($("#formCadastro").valid()) {

        var campoSolucionarPalavra = document.getElementById("solpalavra");

        var palavraCorreta = JSON.parse(localStorage.getItem('palavraCorreta'));

        var palavra = campoSolucionarPalavra.value;

        palavra = palavra.toUpperCase(); // Deixar em Caps-Lock

        localStorage.setItem('solPalavra', JSON.stringify(palavra));

        var casas = JSON.parse(localStorage.getItem('casas'));

        if (palavra == palavraCorreta) { // Se for igual ele acertou
            var contadorDeAcertos = casas;
            localStorage.setItem('acertos', JSON.stringify(contadorDeAcertos));
            ConferirSeGanhouOuPerdeu();

        } else { // Se for diferente ele errou e volta para a página da forca
            alert("Palavra Incorreta!")
            window.location.href = "paginadaforca.html";

        }

    }

}

function AdicionarCTSol() {  // Conferidor se caso ele esteja selecionado o botão dde solucionar palavra
    var SolPalavra = 1;

    localStorage.setItem('SolPalavra', JSON.stringify(SolPalavra));

}

function ExcluirPalavraSOl() {  // Excluir a variável que confirma caso ele esteja selecionando a palvra 
    localStorage.removeItem('SolPalavra');

}