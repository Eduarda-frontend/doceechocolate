# 🍫 **Doce & Chocolate** - Cardápio Online 🍰
![image](https://github.com/user-attachments/assets/3bfcd22f-db70-4a75-b6d4-8c8266c32e93)


## 📜 Descrição

O projeto **Doce & Chocolate** é uma aplicação web que exibe o cardápio de uma confeitaria, permitindo aos clientes visualizar produtos, realizar pedidos diretamente pela interface e finalizar a compra de maneira simples. O sistema também oferece funcionalidades como busca de endereço pelo CEP e envio do pedido via WhatsApp 📱.

A aplicação é construída utilizando HTML, CSS, JavaScript e integrações com o **Bootstrap** para o layout e componentes responsivos, além de **jQuery** para manipulação da interface e interatividade.

Além disso, utilizamos o **Grunt** para automação das tarefas de desenvolvimento, como a compilação de arquivos, minificação e transferência dos arquivos da pasta **`dev`** para a pasta **`dist`**, garantindo que o ambiente de produção esteja sempre otimizado.

Você pode visualizar a versão online do projeto acessando o seguinte link:  
👉 [Acesse o cardápio na Vercel](https://doceechocolate.vercel.app/)

## ⚙️ Funcionalidades

- **Exibição de Produtos**: Os produtos são apresentados com imagens, descrições e preços, permitindo aos usuários escolher itens do cardápio.
- **Carrinho de Compras 🛒**: Os itens adicionados são listados no carrinho e o usuário pode visualizar seu pedido antes de finalizar.
- **Busca de Endereço via CEP 📍**: O endereço do usuário pode ser preenchido automaticamente a partir do CEP fornecido, utilizando a API do **ViaCEP**.
- **Formulário de Pedido 📝**: O usuário preenche seus dados (nome, telefone, endereço) e escolhe a forma de pagamento 💳 antes de finalizar o pedido.
- **Envio de Pedido via WhatsApp 📲**: O pedido é gerado em formato de mensagem e enviado automaticamente para o WhatsApp do estabelecimento, com todos os dados preenchidos.

### 📝 Arquivos principais

- **`index.html`**: O arquivo HTML principal que contém a estrutura da página, incluindo o cabeçalho, o cardápio de produtos, o carrinho de compras e o formulário de pedidos.
  
- **`styles.css`**: Arquivo de estilos personalizados, onde estão definidos os estilos do layout, cores, tipografia e responsividade da página.

- **`scripts/`**:
  - **`jquery.js`**: A biblioteca jQuery, que facilita a manipulação do DOM e a realização de requisições assíncronas.
  - **`jquery.mask.min.js`**: Biblioteca para aplicar máscaras nos campos de formulário, como os campos de telefone e CEP.
  - **`jquery.validate.min.js`**: Biblioteca para validação dos dados do formulário, garantindo que os dados inseridos sejam válidos antes de prosseguir.
  - **`main.js`**: Contém o código JavaScript para manipulação do carrinho de compras, envio do pedido via WhatsApp e busca automática do endereço com base no CEP.
   - **`gruntfile.js`**: Arquivo de configuração do Grunt, onde são definidas as tarefas de automação, como a minificação de arquivos CSS e JS, a cópia de imagens e a movimentação dos arquivos da pasta **`dev`** para a pasta **`dist`**.

   - **`package.json`**: Arquivo que lista as dependências do projeto e scripts para automação, como **Grunt** e **plugins de minificação**.

## 🚀 Como Funciona

### 1. 🍰 **Visualização dos Produtos**
- Os produtos são exibidos nas categorias "Bentô Cake", "Bolos Decorados" e "Brigadeiro".
- Cada produto tem uma imagem, título, descrição e preço.
- O usuário pode adicionar os itens ao carrinho clicando no botão "Adicionar ao carrinho".

### 2. 🛒 **Carrinho de Compras**
- Após adicionar um item ao carrinho, o botão "Finalizar Pedido" aparece na seção do carrinho.
- O usuário pode visualizar os itens selecionados e clicar para finalizar o pedido.

### 3. 📍 **Busca de Endereço**
- O usuário pode inserir o **CEP** no campo apropriado, e o sistema preencherá automaticamente os campos de **endereço**, **bairro**, **cidade** e **estado** utilizando a API do ViaCEP.
- O preenchimento é feito automaticamente ao clicar no botão de "Buscar CEP".

### 4. 📝 **Formulário de Pedido**
- O formulário solicita o **nome**, **telefone**, **celular**, **endereço**, **bairro**, **complemento** e **forma de pagamento**.
- O usuário pode escolher entre **dinheiro** ou **parcelamento**.
- O botão de "Finalizar Pedido" gera uma mensagem com os dados do pedido e redireciona o usuário para o WhatsApp do estabelecimento.

### 5. 📲 **Envio via WhatsApp**
- Ao clicar no botão "Finalizar Pedido", o pedido é enviado para o WhatsApp com todos os dados preenchidos automaticamente.
- A URL do WhatsApp é gerada dinamicamente com os dados codificados.

### 6. 🛠 Testar Funcionalidade
- **CEP**: Teste a busca automática do endereço ao inserir um CEP válido.
- **Carrinho**: Adicione itens ao carrinho e finalize o pedido.
- **WhatsApp**: Verifique se a URL do WhatsApp está sendo gerada corretamente ao finalizar o pedido.

## 🛠 **Automação com Grunt**

- O Grunt é utilizado para automatizar várias tarefas de desenvolvimento e preparação do projeto para produção. As principais tarefas configuradas no **`gruntfile.js`** incluem:

- **Minificação de arquivos CSS e JavaScript**: Os arquivos de estilo e script são minificados para reduzir o tamanho e melhorar o desempenho de carregamento da página.
- **Movimentação de arquivos**: Após a compilação e minificação, os arquivos são movidos da pasta **`dev`** para a pasta **`dist`**, a qual contém os arquivos prontos para produção.
- **Otimizacão de imagens**: As imagens são compactadas para reduzir o tempo de carregamento da página.

## 🏁 Conclusão
O Doce & Chocolate é uma aplicação simples e eficaz para realizar pedidos online, oferecendo uma interface amigável e funcionalidades que garantem uma experiência de compra prática para os clientes. A integração com o WhatsApp facilita a comunicação direta, e a automação da busca de CEP agiliza o preenchimento do endereço, tornando o processo de compra mais rápido e eficiente.

Se você tiver sugestões, sinta-se à vontade para abrir um issue ou enviar um pull request. 😄
