function MontarTabela() { // Desenha a tabela do placar de melhores jogadores
    var tabelaPontuacao = JSON.parse(localStorage.getItem('tabelaPontuacao'));
    var posicao = tabelaPontuacao.length;

    if (posicao != 0) {
        OrdenarVetorTabela(0); // Ordena vetor do placar de melhores jogadorees com o paramêtro 0, isso serve só para dar uma ultima ordenda na tabela
        var posicaoPlacar = "";

        var tabela = document.getElementById("tabela");

        for (var contador = 0; contador < posicao; contador++) {
            var Nick = tabelaPontuacao[contador].nickU;
            var Email = tabelaPontuacao[contador].emailU;
            var Acertos = tabelaPontuacao[contador].vitoriaCT;
            var Erros = tabelaPontuacao[contador].derrotaCT;
            posicaoPlacar = (contador + 1) + "º";

            adicionarLinha(tabela, posicaoPlacar, Nick, Email, Acertos, Erros)

        }
    }

}

function OrdenarVetorTabela(indicePosicao) {  // Ordebador do vetor do placar de melhores jogadores
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));
    var tabelaPontuacao = JSON.parse(localStorage.getItem('tabelaPontuacao'));

    var posicao = tabelaPontuacao.length;

    var conferidorDeBusca = 0;

    for (var contador = 0; contador < posicao; contador++) { // Confere se o usuário que entra nessa função já faz parte do vetor

        if (tabelaPontuacao[contador].nickU == usuarios[indicePosicao].nickU) {
            tabelaPontuacao[contador] = usuarios[indicePosicao];
            conferidorDeBusca = 1;
        }

    }


    if (conferidorDeBusca == 0) { // Se não for encontrado no vetor ele é inserido
        tabelaPontuacao[posicao] = usuarios[indicePosicao];
    }

    var posicao = tabelaPontuacao.length;

    for (var contadorAnt = posicao; contadorAnt > 0; contadorAnt--) { // Estrutura que ordena em ordem crescente as vitórias junto com o usuário

        for (var conatdorSuc = 0; conatdorSuc < contadorAnt - 1; conatdorSuc++) {

            if (tabelaPontuacao[conatdorSuc].vitoriaCT <= tabelaPontuacao[conatdorSuc + 1].vitoriaCT) {

                if (tabelaPontuacao[conatdorSuc].vitoriaCT == tabelaPontuacao[conatdorSuc + 1].vitoriaCT) {

                    if (tabelaPontuacao[conatdorSuc].derrotaCT > tabelaPontuacao[conatdorSuc + 1].derrotaCT) { // Caso as vitórias forem iguais o próximo critério é a quantidade de derrotas

                        var passe = tabelaPontuacao[conatdorSuc];
                        tabelaPontuacao[conatdorSuc] = tabelaPontuacao[conatdorSuc + 1];
                        tabelaPontuacao[conatdorSuc + 1] = passe;

                    }

                } else { // Se não for igual então o vetor é ordenado nos elementos de comparação
                    var passe = tabelaPontuacao[conatdorSuc];
                    tabelaPontuacao[conatdorSuc] = tabelaPontuacao[conatdorSuc + 1];
                    tabelaPontuacao[conatdorSuc + 1] = passe;
                }

            }

        }

        localStorage.setItem('tabelaPontuacao', JSON.stringify(tabelaPontuacao));

    }
}

function adicionarLinha(tabela, TempPosicao, TempNick, TempEmail, TempAcetos, TempErros) {  // Adiciona tabela do placar de melhores jogadores
    var linha = tabela.insertRow(-1);

    var coluna1 = linha.insertCell(0);
    var coluna2 = linha.insertCell(1);
    var coluna3 = linha.insertCell(2);
    var coluna4 = linha.insertCell(3);
    var coluna5 = linha.insertCell(4);

    coluna1.innerText = TempPosicao;
    coluna2.innerText = TempNick;
    coluna3.innerText = TempEmail;
    coluna4.innerText = TempAcetos;
    coluna5.innerText = TempErros;

}