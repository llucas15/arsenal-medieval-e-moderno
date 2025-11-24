document.addEventListener("DOMContentLoaded", async () => {
    // Pega o parâmetro 'id' da URL
    const params = new URLSearchParams(window.location.search);
    const armaId = params.get('id');

    if (!armaId) {
        window.location.href = "index.html"; // Se não tiver ID, volta pra home
        return;
    }

    // Carrega os dados do JSON
    const resposta = await fetch("data.json");
    const dados = await resposta.json();

    // Encontra a arma com o ID correspondente
    const arma = dados.find(a => a.id == armaId);

    if (!arma) {
        window.location.href = "index.html"; // Se não encontrar a arma, volta pra home
        return;
    }

    // Preenche a página com os dados da arma
    document.title = arma.nome; // Muda o título da aba do navegador
    document.getElementById("arma-imagem").src = arma.imagem;
    document.getElementById("arma-imagem").alt = arma.nome;
    document.getElementById("arma-nome").textContent = arma.nome;
    document.getElementById("arma-historia").textContent = arma.historia;
    document.getElementById("arma-uso").textContent = arma.uso;

    // Preenche as novas imagens
    document.getElementById("arma-imagem-uso").src = arma.imagem_uso;
});