$(document).ready(function () {
    $('#cep').mask('00000-000', {
        placeholder: '00000-000',
        required: true
    });

    $('#telefone').mask('(00) 00000-0000');
    $('#celular').mask('(00) 00000-0000', {
        placeholder: '(00) 00000-0000',
        required: true
    });

    $('form').validate({
        rules: {
            nome: {
                required: true
            },
            celular: {
                required: true
            },
            cep: {
                required: true
            },
            complemento: {
                required: true
            },
            formaPagamento: {
                required: true
            }
        },
        messages: {
            nome: 'Por favor, insira seu nome!',
        },
        submitHandler: function (form) {
            console.log(form);
        },
        invalidHandler: function (evento, validador) {
            let camposIncorretos = validador.numberOfInvalids();
            if (camposIncorretos) {
                alert(`Faltam ${camposIncorretos} campos por preen cher!`);
            }
        }
    });

    $('#btn-buscar-cep').click(function () {

        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json/`;
        const botao = $(this);
        $(this).find('i').addClass('d-none');
        $(this).find('span').removeClass('d-none');

        fetch(endpoint)
            .then(function (resposta) {
                return resposta.json();
            })
            .then(function (json) {
                $('#endereco').val(json.logradouro);
                $('#bairro').val(json.bairro);
                $('#cidade').val(json.localidade);
                $('#estado').val(json.uf);
            })
            .catch(function (erro) {
                alert('Este CEP não exite, por favor tente novamente!');
            })
            .finally(function () {
                setTimeout(function () {
                    $(botao).find('i').removeClass('d-none');
                    $(botao).find('span').addClass('d-none');
                }, 1000);
            });
    });

    $('.section__bento-cake button').click(function () {
        const produto = $(this).find('h3').text();
        const imgProduto = $(this).find('img').attr('src');
        const altProduto = $(this).find('img').attr('alt');
        const preco = $(this).find('span').text();

        $('#lista_pedido')
        .html(`
        <li class="d-flex justify-content-center">
        <img class="img-thumbnail rounded my-4" width="150"
            src="${imgProduto}" alt="${altProduto}">
        </li>
        <li>Quantidade:</li>
        <li>Produto:${produto}</li>
        <li>Sabor:</li>
        <li>Observação:</li>
        <li>Valor:${preco}</li>
        <hr>
        <li>Taxa de entrega:</li>
        <li>TOTAL:</li>
        `)
    });

    $('#btn_finalizar').click(function () {
        $('form').submit(function (event) {
            event.preventDefault();

            const nome = $('#nome').val();
            const celular = $('#celular').val();
            const telefone = $('#telefone').val();
            const cep = $('#cep').val();
            const endereco = $('#endereco').val();
            const complemento = $('#complemento').val();
            const bairro = $('#bairro').val();
            const cidade = $('#cidade').val();
            const estado = $('#estado').val();
            const formaPagamento = $('#formaPagamento').val();

            const mensagem = `Dados do cliente:
            
            \n\nNome: ${nome}
            \nTelefone: ${telefone}
            \nCelular: ${celular} 
            \nCEP: ${cep}
            \nEndereço: ${endereco}
            \nComplemento: ${complemento}
            \nBairro: ${bairro}
            \nCidade: ${cidade}
            \nEstado: ${estado}

            \n\nPedido:

            \n\nQuantidade:
            \nProduto:
            \nSabor:
            \nObservação:
            \nValor:

            \n\nTaxa de entrega:
            \nValor total:
            \nForma de pagamento: ${formaPagamento}
            `;
            const mensagemUrl = encodeURIComponent(mensagem);
            const linkWhatsapp = `https://wa.me/556499275875?text=${mensagemUrl}`
            window.open(linkWhatsapp, '_blank');
        });
    });

})
