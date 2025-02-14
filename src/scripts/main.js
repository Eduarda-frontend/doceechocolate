
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

let carrinho = [];


$('#menu').click(function (event) {
    let parentButton = event.target.closest('.card-button');
    let $button = $(parentButton);
    let nomeProduto = $button.attr('data-name');
    let valor = parseFloat($button.attr('data-price'));

    if (parentButton) {

        adicionaPedido(nomeProduto, valor);
        
    }
})

// FUNÇÃO PARA ADICIONAR NO CARRINHO

function adicionaPedido(nomeProduto, valor) {

    const itemDuplicado = carrinho.find(item => item.nomeProduto === nomeProduto);

    if(itemDuplicado){
        itemDuplicado.quantidade += 1;
        return
    }else{
        carrinho.push({
            nomeProduto,
            valor,
            quantidade:1
        })
        
    }

    atualizaCarrinho()
}


// ATUALIZA CARRINHO

function atualizaCarrinho(){
    let listaPedidosConteiner = $('#lista-pedido');
    listaPedidosConteiner.html("");
    let total = 0;

    
    carrinho.forEach(item =>{

        const criaPedidoHtml = document.createElement("li");
        $(criaPedidoHtml).addClass("col-6 col-lg-12");
        criaPedidoHtml.innerHTML = 
            `
            <div class=" p-0 mb-3"> 
            
            <div> 
                <p class="fw-bold">${item.nomeProduto}</p>
                <p>Quantidade: ${item.quantidade}</p>
                <p class="mt-2"> ${item.valor.toFixed(2)} </p>
            </div>

                <button> Remover</button> 

            </div>
        `
        total += item.valor * item.quantidade;
        listaPedidosConteiner.append(criaPedidoHtml);
    });

    $('#valor-total').text(total.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    }));

    let contadorCarrinho = $('#contador-carrinho');
    contadorCarrinho.text(carrinho.length);
}


function EnviaPedido(botao) {

    // Pedido.call(this, botao);

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

        // const pedido = new Pedido(this);

        // pedido.criaPedidoHtml();
        // pedido.adicionaPedido();


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
