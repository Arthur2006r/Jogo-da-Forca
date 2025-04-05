$(document).ready(function () {
});

$("#formCadastro").validate(
    {
        rules: {
            solpalavra: {
                required: true
            },
        },
        messages: {
            solpalavra: {
                required: "Campo obrigatório",

            },
        }
    }
);