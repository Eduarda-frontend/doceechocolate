
function BuscarEndereco(botao, campos) {
    this.botao = botao;
    this.campos = campos;
    this.endpoint = `https://viacep.com.br/ws/`;
    
    this.buscar = function () {
        const self = this;
        const cep = $(self.campos.cep).val();
        const url = `${self.endpoint}${cep}/json/`;

        fetch(url)
            .then((resposta) => {
                
                if(!resposta.ok){
                    throw new Error('Erro na requisição');
                }

                return resposta.json();
            })
            .then((json) => {
                
                if(json.erro){
                    throw new Error('CEP não encontrado');
                }
            
                $(self.campos.endereco).val(json.logradouro);
                $(self.campos.bairro).val(json.bairro);
                $(self.campos.cidade).val(json.localidade);
                $(self.campos.estado).val(json.uf);

            })
            .catch(function (erro) {
                console.error('Erro na requisição:', erro);
                alert('Este CEP não exite, por favor tente novamente!');

            })

    };
};

// LIMPA INPUTS COM OS DADOS DO ENDEREÇO

$('#limparCep').on('click',function(){
    $('#cep').val('');
    $('#endereco').val('');
    $('#complemento').val('');
    $('#bairro').val('');
    $('#cidade').val('');
    $('#estado').val('');
})

let carrinho = [];


$('#menu').click(function (event) {
    let parentButton = event.target.closest('.card-button');
    let $button = $(parentButton);
    let nomeProduto = $button.attr('data-nome');
    let valor = parseFloat($button.attr('data-valor'));

    if (parentButton) {

        adicionaPedido(nomeProduto, valor);
        
    }
})

// FUNÇÃO PARA ADICIONAR NO CARRINHO

function adicionaPedido(nomeProduto, valor) {

    const itemDuplicado = carrinho.find(item => item.nomeProduto === nomeProduto);

    if(itemDuplicado){
        itemDuplicado.quantidade += 1;
        
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

            <button class="remove__item" data-nome="${item.nomeProduto}"> Remover </button> 

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

// REMOVE ITEM

$('#lista-pedido').click(function(event){
    if(event.target.classList.contains('remove__item')){
        const nomeProduto = event.target.getAttribute('data-nome')


        removeItemCarrinho()
    }
})

function removeItemCarrinho(nome){
    const index = carrinho.findIndex(item => item.nome === nome)

    if(index !== -1){
        const item = carrinho[index];
        
        if(item.quantidade > 1){
            item.quantidade -= 1;
            atualizaCarrinho()
            return
        }

        carrinho.splice(index, 1);
        atualizaCarrinho();
    }
}

function EnviaPedido() {


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

    $('#btn_finalizar').click(function (event) {
        event.preventDefault();
        const botao = $(this);
        const enviaPedido = new EnviaPedido(botao); // Cria a instância de EnviaPedido
        enviaPedido.enviarMensagem(); // Envia a mensagem via WhatsApp
    });

})
