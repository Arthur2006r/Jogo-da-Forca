$(document).ready(function () {
});

$("#formCadastro").validate(
    {
        rules: {
            nickUsuario: {
                required: true
            },
            senhaUsuario: {
                required: true,
                minlength: 3,
            },
            emailUsuario: {
                required: true,
                email: true
            }
        },
        messages: {
            nickUsuario: {
                required: "Campo obrigatório",

            },
            senhaUsuario: {
                required: "Campo obrigatório",
                minlength: "Sua senha deve conter no mínimo 3 caracteres",
            },
            emailUsuario: {
                required: "Campo obrigatório",
                email: "E-mail inválido"
            }
        }
    }
);
