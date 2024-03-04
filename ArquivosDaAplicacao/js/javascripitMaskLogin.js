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
            },
        },
        messages: {
            nickUsuario: {
                required: "Campo obrigatório",

            },
            senhaUsuario: {
                required: "Campo obrigatório",
            }
        }
    }
);