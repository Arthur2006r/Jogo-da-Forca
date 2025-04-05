function EscolhadeTema(temaO) {  // Função para armazenar o tema escolhido pelo usuário
    localStorage.setItem('tema', JSON.stringify(temaO));
    window.location.href = "paginaniveldificuldade.html";

}

function EscolhadeDificuldade(dificuldadeO) {  // Função para armazenar a dificuldade escolhida pelo usuário 
    localStorage.setItem('dificuldade', JSON.stringify(dificuldadeO));
    window.location.href = "paginadaforca.html";

}

function MontarJogo() {   // Função que Monta o jogo, aleaotizando a palavra, destrinchando em um vetor, escrevendo informações e atualizando teclado e dica
    var SolPalavra = JSON.parse(localStorage.getItem('SolPalavra'));

    if (SolPalavra != 1) {  //  Conferir se a página atualiza após a tentativa de solucionar a palavra oculta
        localStorage.removeItem('campoLetraSelecDes');
        localStorage.removeItem('dicaDes');

        EscreverInformacao();

        AleatorizarPalavra();

        AdicionarTabela();

        AdicionarForca();

        Logar();
    } else {  // Se for após a tentaiva de solucionar serão atualizados o botão da dica e do teclado (eles não serão 'resetados')
        localStorage.removeItem('SolPalavra');

        if (localStorage.campoLetraSelecDes) {  //  Arrumar teclado caso haver seu local da memória secundária, pois se não houver, não houve clique nas teclas antes da tentativa de solucionar            
            ArrumarTeclado();
        }

        if (!localStorage.DicaDes) {  //  Arrumar dica caso haver seu local da memória secundária, pois se não houver, não houve clique na dica antes da tentativa de solucionar       
            ArrumarDica();
        }

        EscreverInformacao();

        AdicionarTabela();

        AdicionarForca();

        Logar();
    }

}

function EscreverInformacao() {
    // Escrever as informações (TEMA E DIFICULADADE) na tela
    var campoDoTema = document.getElementById("temr");
    var campoDaDificuldade = document.getElementById("difc");

    var temaO = JSON.parse(localStorage.getItem('tema'));
    var dificuldadeO = JSON.parse(localStorage.getItem('dificuldade'));

    campoDoTema.innerHTML = temaO;
    campoDaDificuldade.innerHTML = dificuldadeO;

}

function AleatorizarPalavra() {
    // Aleatorizar a palavra da rodada
    var PalavrasBD = JSON.parse(localStorage.getItem('bancodedadospalavras'));
    var temaO = JSON.parse(localStorage.getItem('tema'));
    var dificuldadeO = JSON.parse(localStorage.getItem('dificuldade'));

    var palavrasRodada = [];  // vetor criado para armazenar as palavras relacionadas ao tema e dificuldade escolhidos pelo usuário
    var temp = 0;

    for (var posicao = 0; posicao <= 59; posicao++) {
        if ((PalavrasBD[posicao].tema == temaO) &&
            (PalavrasBD[posicao].nivelDificuldade == dificuldadeO)) {
            palavrasRodada[temp] = PalavrasBD[posicao];
            temp++

        }

    }

    localStorage.setItem('palavrasRodada', JSON.stringify(palavrasRodada));

    VerificarRepeticao();  // Função para verificar se a palavra se repetiu

    ZerarContadores(); // Zera contadores dos erros e acertos

    DestrincharPalavra();  // Separa letra por letra da palavra oculta e passsa para um vetor

}

function VerificarRepeticao() {  /* Função para verificar se a palavra se repetiu, essa função faz com que a palavra da rodada repita o mínimo o possível. Ela armazena em vetor de objeto as informações de cada palavra jogadas. */
    var indiceLogin = JSON.parse(localStorage.getItem('indiceLogin'));
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    var temaO = JSON.parse(localStorage.getItem('tema'));
    var dificuldadeO = JSON.parse(localStorage.getItem('dificuldade'));

    var palavrasRodada = JSON.parse(localStorage.getItem('palavrasRodada'));
    var pararWhile = false;

    var tamanhoVetor = usuarios[indiceLogin].vetorPalavrasJogadas.length;  // Pega o tamanho do vetor que armazena as palavras já jogadas
    var contadorPalavras = 0;

    var posicaoPalavraOculta = Math.floor(Math.random() * 5);


    var word = new Object(); //  Objeto para armazenar as informações das palavras já jogadas

    if (tamanhoVetor == 0) {  // Caso for a primeira rodada, a palavra vai ser armazenada no vetor [0]
        word.temaV = temaO;
        word.difcV = dificuldadeO;
        word.text = palavrasRodada[posicaoPalavraOculta].texto;

        usuarios[indiceLogin].vetorPalavrasJogadas[0] = word;

    } else {  // Se não, a palavra vai passar por um processo para conferir se a palavra repete, se não repetir ela é armazenada no vetor do seu respectivo indice

        while (pararWhile == false) {

            posicaoPalavraOculta = Math.floor(Math.random() * 5);  // Vai gerando o indice (palavra oculta aleatória) até ela não se repetir 
            var palavraVerificar = palavrasRodada[posicaoPalavraOculta].texto;

            var repetiu = 0;

            for (var contador = 0; contador < tamanhoVetor; contador++) {  // Passa por todo vetor das palavras já jogadas, conferindo se repete

                if ((usuarios[indiceLogin].vetorPalavrasJogadas[contador].temaV == temaO) && (usuarios[indiceLogin].vetorPalavrasJogadas[contador].difcV == dificuldadeO)) {  // Confere se o tema e dificuldade são os mesmos

                    contadorPalavras++;

                    if (palavraVerificar == usuarios[indiceLogin].vetorPalavrasJogadas[contador].text) { // Confere se a palavra repete
                        repetiu = 1;
                    }

                }

            }

            if (repetiu == 0) {  // Se não repetir a palavra é armazenada no vetor das palavras já jogadas 
                pararWhile = true;  // Recebe true para interromper while
                word.temaV = temaO;
                word.difcV = dificuldadeO;
                word.text = palavrasRodada[posicaoPalavraOculta].texto;

                usuarios[indiceLogin].vetorPalavrasJogadas[tamanhoVetor] = word;
            } else {  // Se repetir
                if (contadorPalavras == 5) {  // Confere se todas as palavras do tema e dificuldade selecionado já foi jogado, se sim, ela passa removendo essas palavras do vetor das palavras já jogadas
                    for (var contador = 0; contador < tamanhoVetor; contador++) {
                        if ((usuarios[indiceLogin].vetorPalavrasJogadas[contador].temaV == temaO) && (usuarios[indiceLogin].vetorPalavrasJogadas[contador].difcV == dificuldadeO)) {
                            usuarios[indiceLogin].vetorPalavrasJogadas[contador].temaV = "";
                            usuarios[indiceLogin].vetorPalavrasJogadas[contador].difcV = "";
                            usuarios[indiceLogin].vetorPalavrasJogadas[contador].text = "";
                        }
                    }
                }
            }

        }

    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('posicaoPalavraOculta', JSON.stringify(posicaoPalavraOculta));

}

function ZerarContadores() {  // Zera contadores dos erros e acertos
    var contadorDeAcertos = 0;
    var contadorDeErros = 0;

    localStorage.setItem('acertos', JSON.stringify(contadorDeAcertos));
    localStorage.setItem('erros', JSON.stringify(contadorDeErros));

}

function DestrincharPalavra() { // Separa letra por letra da palavra oculta e passsa para um vetor
    debugger
    var palav = JSON.parse(localStorage.getItem('palavrasRodada'));
    var posicaoPalavraOculta = JSON.parse(localStorage.getItem('posicaoPalavraOculta'));
    var palavraOcult = palav[posicaoPalavraOculta].texto;

    localStorage.setItem('palavraCorreta', JSON.stringify(palavraOcult));

    var contadorDeAcertos = JSON.parse(localStorage.getItem('acertos'));

    var casas = palavraOcult.length;
    var PalavraOculta = [casas]; // Vetor da palavrea oculta
    var Resposta = [casas]; // Vetor da palavra resposta
    var Tracos = [casas]; // Vetor dos traços 

    for (var caracter = 0; caracter < casas; caracter++) {
        PalavraOculta[caracter] = palavraOcult.substring(caracter + 1, caracter); // Separa cada caracter da palavra oculta
        Resposta[caracter] = "ㅤ";  // Preenche vetor resposta (vazia inicialmente)

        if (PalavraOculta[caracter] == " ") {
            Tracos[caracter] = "ㅤ";
            contadorDeAcertos++;
        } else {
            Tracos[caracter] = "_";
        }

    }

    localStorage.setItem('acertos', JSON.stringify(contadorDeAcertos));
    localStorage.setItem('casas', JSON.stringify(casas));
    localStorage.setItem('PalavraOculta', JSON.stringify(PalavraOculta));
    localStorage.setItem('Resposta', JSON.stringify(Resposta));
    localStorage.setItem('Traços', JSON.stringify(Tracos));

}

function RemoverTabela() {  // Remove tabela 
    var tabelaPalavra = document.getElementById("tabela");
    var linhas = tabelaPalavra.getElementsByTagName('tr');

    var quantidade = linhas.length;
    var contador = quantidade - 1;
    while (contador >= 1) {
        tabelaPalavra.deleteRow(contador);
        contador = contador - 1;
    }

}

function AdicionarTabela() {  // Adicona tabela dos traços e da resposta na tabela 
    var tabela = document.getElementById("tabela");
    var linha = tabela.insertRow(1);

    var Resposta = JSON.parse(localStorage.getItem('Resposta'));
    var Tracos = JSON.parse(localStorage.getItem('Traços'));
    var casas = JSON.parse(localStorage.getItem('casas'));

    for (var colunact = 0; colunact < casas; colunact++) {  // Adiciona traços
        var coluna = linha.insertCell(colunact);
        coluna.innerText = Tracos[colunact];
    }
    var linha = tabela.insertRow(1);
    for (colunact = 0; colunact < casas; colunact++) { // Adiciona Resposta
        coluna = linha.insertCell(colunact);
        coluna.innerText = Resposta[colunact];
    }

}

function AdicionarForca() {  // Adiciona a forca a medida que o usuário erra a letra
    var contadorErros = JSON.parse(localStorage.getItem('erros'));
    var vetorImagem = JSON.parse(localStorage.getItem('imagensForca'));

    let imagem = vetorImagem[contadorErros];

    var imagemAtual = imagem;

    document.getElementById("forcaIM").src = imagemAtual;
}

function ConferirLetra(letra, posicao) {  // Confere a letra artravez de parâmetros (a posição das teclas no teclado e a letra da tecla)
    var casas = JSON.parse(localStorage.getItem('casas'));
    var contadorDeAcertos = JSON.parse(localStorage.getItem('acertos'));
    var contadorDeAcertosDaJogada = 0;

    var PalavraOculta = JSON.parse(localStorage.getItem('PalavraOculta'));
    var Resposta = JSON.parse(localStorage.getItem('Resposta'));

    var campoLetraSelecTecla = document.querySelectorAll(".teclas");  // Pega a classe das teclas pra uma variável, formando um vetor 
    if (!localStorage.campoLetraSelecDes) {  // Se não tiver na memória secundária ele cria o vetor e zera todos seus elementos
        var campoLetraSelecDes = [25];
        for (var aux = 0; aux < 26; aux++) {
            campoLetraSelecDes[aux] = 0
        }
    } else {
        var campoLetraSelecDes = JSON.parse(localStorage.getItem('campoLetraSelecDes'));  // Se tiver ele salva na memória secundária
    }

    campoLetraSelecTecla[posicao].removeAttribute("onclick");
    campoLetraSelecTecla[posicao].setAttribute("class", "teclas tecladesabilitado");
    campoLetraSelecDes[posicao] = 1;  // Remove atributos dos botões html

    for (var caracter = 0; caracter < casas; caracter++) {  // Confere se a letra selecionada faz parte da plavra oculta (vetor da palavra oculta destrinchada)
        var letraOculta = PalavraOculta[caracter].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if (letra == letraOculta) {
            Resposta[caracter] = PalavraOculta[caracter];
            contadorDeAcertos++;  // Adiciona acertos caso a letra foi correta
            contadorDeAcertosDaJogada++;

        }

    }

    if (contadorDeAcertosDaJogada == 0) {  // Se não acertou, adiciona ao contador de erro e vai parta função de desenhar a forca 
        var errosCT = JSON.parse(localStorage.getItem('erros'));
        errosCT++;
        localStorage.setItem('erros', JSON.stringify(errosCT));
        AdicionarForca();

    }

    localStorage.setItem('Resposta', JSON.stringify(Resposta));
    localStorage.setItem('acertos', JSON.stringify(contadorDeAcertos));
    localStorage.setItem('campoLetraSelecDes', JSON.stringify(campoLetraSelecDes));

    RemoverTabela();  // Remove tabela 

    AdicionarTabela(); // Adicona tabela dos traços e da resposta na tabela 

    ConferirSeGanhouOuPerdeu();  // Confere se a quantidade de acertos bate com a quantidade de caracteres, assim sabemos se o usuário ganhou ou perdeu

}

function ConferirSeGanhouOuPerdeu() {  // Confere se a quantidade de acertos bate com a quantidade de caracteres, assim sabemos se o usuário ganhou ou perdeu
    var indiceLogin = JSON.parse(localStorage.getItem('indiceLogin'));
    var usuarios = JSON.parse(localStorage.getItem('usuarios'));

    var acertosCT = JSON.parse(localStorage.getItem('acertos'));
    var errosCT = JSON.parse(localStorage.getItem('erros'));

    var casas = JSON.parse(localStorage.getItem('casas'));

    if (acertosCT == casas) {  // Se a quantidade de acertos é igual a quantidade de caracteres a pessoa ganhou
        usuarios[indiceLogin].vitoriaCT++;

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        OrdenarVetorTabela(indiceLogin);  // Odernar vetor do Placar

        window.location.href = "paginaVenceu.html";

    } else {

        if (errosCT == 6) { // Se a quantidade de erros for igual a 6 o usuário perdeu
            usuarios[indiceLogin].derrotaCT++;

            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            OrdenarVetorTabela(indiceLogin); // Odernar vetor do Placar

            window.location.href = "paginaDerrota.html";

        }

    }

}

function CliqueDica() {  // Exibe a dica e desabilita botão
    var campoDaDica = document.getElementById("dica");
    var escritaDica = document.getElementById("areaDica");

    var palav = JSON.parse(localStorage.getItem('palavrasRodada'));
    var posicaoPalavraOculta = JSON.parse(localStorage.getItem('posicaoPalavraOculta'));

    var dicaRodada = palav[posicaoPalavraOculta].dica;

    var dicaDes = 1;

    localStorage.setItem('dicaDes', JSON.stringify(dicaDes));

    alert(dicaRodada);

    campoDaDica.removeAttribute("onclick");
    campoDaDica.setAttribute("class", "dicadesabilitado");
    escritaDica.innerHTML = "Dica 0x";

}

function AdicionarPalavraCorreta() { // Caso a pessoa perder a palavra oculta é exibida na página de derrota
    var campoPalavraCorreta = document.getElementById("palavraCorreta");
    var palavra = JSON.parse(localStorage.getItem('palavraCorreta'));

    campoPalavraCorreta.innerHTML = palavra;

    Logar();  // Loga na conta do usuário que está jogando

}

function ArrumarTeclado() {  // Arruma teclado após clicar em solucionar palavara
    var campoLetraSelecTecla = document.querySelectorAll(".teclas");

    var campoLetraSelecDes = JSON.parse(localStorage.getItem('campoLetraSelecDes'));

    for (var contador = 0; contador < 26; contador++) {  // Confere tecla por tecla caso elas já tenham sido selecionadas, se sim, a tecla é desabilitada

        if (campoLetraSelecDes[contador] == 1) {
            campoLetraSelecTecla[contador].setAttribute("class", "teclas tecladesabilitado");
            campoLetraSelecTecla[contador].removeAttribute("onclick");
        }

    }

}

function ArrumarDica() {  // Arruma dica após clicar em solucionar palavara
    var dicaDes = JSON.parse(localStorage.getItem('dicaDes'));

    if (dicaDes == 1) {  // Se a dicaDes foi 1 então ela é desabilitada
        var campoDaDica = document.getElementById("dica");
        var escritaDica = document.getElementById("areaDica");
        campoDaDica.removeAttribute("onclick");
        campoDaDica.setAttribute("class", "dicadesabilitado");
        escritaDica.innerHTML = "Dica 0x";
    }
}