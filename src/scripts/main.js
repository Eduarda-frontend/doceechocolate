function BuscarEndereco(botao, campos) {
    this.botao = botao;
    this.campos = campos;
    this.endpoint = `https://viacep.com.br/ws/`;

    this.buscar = function () {
        const self = this;
        const cep = $(self.campos.cep).val();
        const url = `${self.endpoint}${cep}/json/`;

        $(self).find('i').addClass('d-none');
        $(self).find('span').removeClass('d-none');

        fetch(url)
            .then((resposta) => resposta.json())
            .then((json) => {
                $(self.campos.endereco).val(json.logradouro);
                $(self.campos.bairro).val(json.bairro);
                $(self.campos.cidade).val(json.localidade);
                $(self.campos.estado).val(json.uf);
            })
            .catch(function (erro) {
                alert('Este CEP não exite, por favor tente novamente!');
            })
            .finally(() => {
                setTimeout(() => {
                    $(self.botao).find('i').removeClass('d-none');
                    $(self.botao).find('span').addClass('d-none');
                }, 1000);
            });
    };
};

function Pedido(botao) {

    this.dados = {};

    this.dados.produto = $(botao).find('h3').text();
    this.dados.imgProduto = $(botao).find('img').attr('src');
    this.dados.altProduto = $(botao).find('img').attr('alt');
    this.dados.precoTexto = $(botao).find('span').text();

    this.criaPedidoHtml = function () {
        return `
        <li class="col-6 col-lg-12">
        <ul class="p-0 mb-3">
        <li class="d-flex justify-content-center">
        <img class="img-thumbnail rounded my-4" width="150"
        src="${this.dados.imgProduto}" alt="${this.dados.altProduto}">
        </li>
        <div class="d-flex">
            <li class="fw-bold">Produto:</li>
            <li>${this.dados.produto}</li>
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
            <li>R$ ${this.dados.precoTexto}</li>
        </div>
        </ul>
        <button id="btn-remove_pedido"  class="text-danger">
        <i class="bi bi-trash3-fill"></i>
        Remover</button>
        </li>`;
    };

    this.adicionaPedido = function () {
        let pedidoHtml = this.criaPedidoHtml();

        $('#lista_pedido').append(pedidoHtml);
        $('#lista_seu_pedido').append(pedidoHtml);

    };

};

function EnviaPedido(botao) {

    Pedido.call(this, botao);

    this.nome = $('#nome').val();
    this.celular = $('#celular').val();
    this.telefone = $('#telefone').val();
    this.cep = $('#cep').val();
    this.endereco = $('#endereco').val();
    this.complemento = $('#complemento').val();
    this.bairro = $('#bairro').val();
    this.cidade = $('#cidade').val();
    this.estado = $('#estado').val();
    this.formaPagamento = $('#formaPagamento').val();

    this.mensagem = function () {
        return `
        Dados do cliente:
            
            \n\nNome: ${this.nome}
            \nTelefone: ${this.telefone}
            \nCelular: ${this.celular} 
            \nCEP: ${this.cep}
            \nEndereço: ${this.endereco}
            \nComplemento: ${this.complemento}
            \nBairro: ${this.bairro}
            \nCidade: ${this.cidade}
            \nEstado: ${this.estado}

            \n\nPedido:

            \n\nProduto:${this.dados.produto}
            \nSabor:
            \nObservação:
            \nValor:${this.dados.precoTexto}

            \n\nTaxa de entrega: 
            \nValor total:${this.dados.precoTexto}
            \nForma de pagamento: ${this.formaPagamento}
            `

    };

    this.mensagemUrl = encodeURIComponent(this.mensagem())
    this.linkWhatsapp = `https://wa.me/5564992754875?text=${this.mensagemUrl}`

    this.enviarMensagem = function () {

        window.open(this.linkWhatsapp, '_blank');
    };

};

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

    $('.card-button').on('click', function (evento) {

        const pedido = new Pedido(this);

        pedido.criaPedidoHtml();
        pedido.adicionaPedido();


        $('#bag').addClass('d-none');
        $('#lista_pedido').removeClass('d-none');

    });

    $('#btn_finalizar').click(function (event) {
        event.preventDefault();
        const botao = $(this);
        const enviaPedido = new EnviaPedido(botao); // Cria a instância de EnviaPedido
        enviaPedido.enviarMensagem(); // Envia a mensagem via WhatsApp
    });

})
