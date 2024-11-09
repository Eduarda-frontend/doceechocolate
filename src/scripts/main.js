function BuscarEndereco(botao, campos) {
    this.botao = botao;
    this.campos = campos;
    this.endpoint = `https://viacep.com.br/ws/`;

    this.buscar = function () {

        const cep = $(this.campos.cep).val();
        const url = `${this.endpoint}${cep}/json/`;

        $(this).find('i').addClass('d-none');
        $(this).find('span').removeClass('d-none');

        fetch(url)
            .then((resposta) => resposta.json())
            .then((json) => {
                $(this.campos.endereco).val(json.logradouro);
                $(this.campos.bairro).val(json.bairro);
                $(this.campos.cidade).val(json.localidade);
                $(this.campos.estado).val(json.uf);
            })
            .catch(function (erro) {
                alert('Este CEP não exite, por favor tente novamente!');
            })
            .finally(() => {
                setTimeout(() => {
                    $(botao).find('i').removeClass('d-none');
                    $(botao).find('span').addClass('d-none');
                }, 1000);
            });
    };
};
function Pedido(botao) {
    this.produto = '';
    this.imgProduto = '';
    this.altProduto = '';
    this.precoTexto = '';
    this.listaPedidos = [];

    this.coletaInformacoes = function () {

        this.produto = $(botao).find('h3').text();
        this.imgProduto = $(botao).find('img').attr('src');
        this.altProduto = $(botao).find('img').attr('alt');
        this.precoTexto = $(botao).find('span').text();

        this.criaPedidoHtml = function () {
            return `
            <li class="d-flex justify-content-center">
            <img class="img-thumbnail rounded my-4" width="150"
            src="${this.imgProduto}" alt="${this.altProduto}">
            </li>
            <div class="d-flex">
            <li class="fw-bold">Quantidade:</li>
            <li></li>
            </div>
            <div class="d-flex">
                <li class="fw-bold">Produto:</li>
                <li>${this.produto}</li>
            </div>
            <div class="d-flex">
                <li class="fw-bold">Sabor:</li>
                <li></li>
            </div>
            <div class="d-flex">
                <li class="fw-bold">Observação:</li>
                <li></li>
            </div>
            <div class="d-flex">
                <li class="fw-bold">Valor:</li>
                <li>R$ ${this.precoTexto}</li>
            </div>`;
        }
    }

    this.adicionaPedido = function () {
        let pedidoHtml = this.criaPedidoHtml();

        this.listaPedidos.push({
            produto: this.produto,
            imgProduto: this.imgProduto,
            altProduto: this.altProduto,
            precoTexto: this.precoTexto
        });

        $('#lista_pedido').append(pedidoHtml);
    };
}

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

    // Busca o enderaço através do site
    const campos = {
        cep: '#cep',
        endereco: '#endereco',
        bairro: '#bairro',
        cidade: '#cidade',
        estado: '#estado'
    }

    const botaoBuscarCep = $('#btn-buscar-cep');
    const buscarCep = new BuscarEndereco(botaoBuscarCep, campos);

    $(botaoBuscarCep).click(function () {
        buscarCep.buscar();
    });

    //Adiciona o item ao carrinho



    $('.section__bento-cake button').click(function () {

        const pedido = new Pedido(this);

        pedido.coletaInformacoes();
        pedido.adicionaPedido();

        $('#bag').addClass('d-none');
        $('#lista_pedido').removeClass('d-none');
    });

    $('#btn-informacoes_pedido').click(function () {
        $('#lista_seu_pedido')
            .html(`
        <li class="d-flex justify-content-center">
            <img class="img-thumbnail rounded my-4" width="150"
            src="${imgProduto}" alt="${altProduto}">
        </li>

        <div class="d-flex">
            <li class="fw-bold">Quantidade:</li>
            <li></li>
        </div>
        <div class="d-flex">
            <li class="fw-bold">Produto:</li>
            <li>${produto}</li>
        </div>
        <div class="d-flex">
            <li class="fw-bold">Sabor:</li>
            <li></li>
        </div>
        <div class="d-flex">
            <li class="fw-bold">Observação:</li>
            <li></li>
        </div>
        <div class="d-flex">
            <li class="fw-bold">Valor:</li>
            <li>R$ ${precoTexto}</li>
        </div>

        `)
    });

    //Enviar pedido via whatsapp    

    $('#btn_finalizar').click(function (event) {
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

})
