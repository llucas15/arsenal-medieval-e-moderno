const cardcontainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
const botaoBusca = document.querySelector("#botao-busca");
let dados = [];

// Função que carrega os dados do JSON e os armazena na variável 'dados'
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os cards inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

// Função que renderiza os cards na tela
function renderizarCards(listaDeArmas) {
    cardcontainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards

    for (const dado of listaDeArmas) {
        const article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.descricao}</p>
            <p><strong>Criação:</strong> ${dado.criacao}</p>
            <p><a href="./arma.html?id=${dado.id}">saiba mais</a></p>
        `;
        cardcontainer.appendChild(article);
    }
}

// Função para filtrar os dados com base na busca
function filtrarDados() {
    const termoBusca = inputBusca.value.toLowerCase();
    const resultadoFiltro = dados.filter(arma => 
        arma.nome.toLowerCase().includes(termoBusca) ||
        arma.descricao.toLowerCase().includes(termoBusca)||
        arma.criacao.toLowerCase().includes(termoBusca) 
    );
    renderizarCards(resultadoFiltro);
}

// Adiciona o "ouvinte" de evento para o botão de busca
botaoBusca.addEventListener("click", filtrarDados);

// Carrega os dados assim que o script é executado
carregarDados();
