function Cadastrar() {  // Cadastra usuário
    if ($("#formCadastro").valid()) {  // Confere se todos os inputs foram preenchidos corretamente
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));

        var campoNick = document.getElementById("nickUsuario");
        var campoSenha = document.getElementById("senhaUsuario");
        var campoEmail = document.getElementById("emailUsuario");

        var Nick = campoNick.value;
        var Senha = campoSenha.value;
        var Email = campoEmail.value;

        var usu = new Object(); // Objeto que contem Nikname, senha, email, quantidade de derrotas, quantidades de vitorias e o vetor de palavras já jogadas

        if (usuarios.length == 0) {  // caso não haja usuários já é preenchido na posição [0] do vetor de usuários
            usu.nickU = Nick;
            usu.senhaU = Senha;
            usu.emailU = Email;
            usu.derrotaCT = 0;
            usu.vitoriaCT = 0;
            usu.vetorPalavrasJogadas = [];

            usuarios[0] = usu;

            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            OrdenarVetorTabela(0);  // Ordena o vetor do placar de melhores jogadores com o inice do vetor usuarios

            window.location.href = "paginaLogin.html";

        } else { // Caso já tenha havido cadastros ele passa peo vetor conferindo se não repete dados
            var posicao = usuarios.length;

            for (var contador = 0; contador < posicao; contador++) { // Conferir de repete
                if ((Nick == usuarios[contador].nickU) || (Senha == usuarios[contador].senhaU) || (Email == usuarios[contador].emailU)) {

                    var restricaoRepetir = 1;

                }

            }

            if (restricaoRepetir == 1) {  // Se repetir é informado ao usuário
                alert("Não é possível realizar o cadatro! Pois o nick, a senha ou o email já pertencem a outro usuário! Por favor, digite novamente.")

            } else { // Se não, é cadastrado o usuário a o indice d quantidade de elementos no vetor usuários
                usu.nickU = Nick;
                usu.senhaU = Senha;
                usu.emailU = Email;
                usu.derrotaCT = 0;
                usu.vitoriaCT = 0;
                usu.vetorPalavrasJogadas = [];

                usuarios[posicao] = usu;

                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                OrdenarVetorTabela(posicao);  // Ordena o vetor do placar de melhores jogadores com o inice do vetor usuarios

                window.location.href = "paginaLogin.html";

            }

        }

    }

}

function Login() {  // Função para logar na conta
    if ($("#formCadastro").valid()) {  // Confere se todos os inputs foram preenchidos corretamente

        var usuarios = JSON.parse(localStorage.getItem('usuarios'));

        var campoNick = document.getElementById("nickUsuario");
        var campoSenha = document.getElementById("senhaUsuario");

        var Nick = campoNick.value;
        var Senha = campoSenha.value;

        var posicao = usuarios.length;

        for (var contador = 0; contador < posicao; contador++) {  // Confere se a senha e o Nickname estão corretos e batem com uma conta cadastrada
            if ((Nick == usuarios[contador].nickU) && (Senha == usuarios[contador].senhaU)) {

                var Login = 1;
                var indiceLogin = contador;

            }

        }

        if (Login == 1) { // Direciona para a página do jogo
            localStorage.setItem('indiceLogin', JSON.stringify(indiceLogin));

            window.location.href = "paginaInicioJogo.html";

        } else { 

            if (posicao == 0) { // Se posição for igual a 0 então ainda não houve cadastros
                alert("Ainda não foi cadastrado nenhuma conta, porfavor tente novamente após algum cadastro")
            } else { // É alertado ao usuário se não foi encontrado a conta que o usuário quis logar
                alert("Não foi possível fazer login! Senha ou Nick inválidos, digite novamente.")
            }

        }

    }

}

function Logar() {  // Loga na conta do usuário, exibindo o nickname do usuário
    if (JSON.parse(localStorage.getItem('indiceLogin')) == null) {

        alert("Não foi possível acessar esta página! Você não logou em uma conta antes. Por favor, tente novamente após logar.")
        window.location.href = "paginainicial.html";

    } else {

        var indiceLogin = JSON.parse(localStorage.getItem('indiceLogin'));
        var usuarios = JSON.parse(localStorage.getItem('usuarios'));

        var campoUsuario = document.getElementById("usuario");

        campoUsuario.innerHTML = usuarios[indiceLogin].nickU;

    }

}

function DeslogarConta() { // Desloga da conta do usuário caso necessário
    localStorage.removeItem('indiceLogin');

}