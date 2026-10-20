const API_URL = '/api/produtos';
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');
const mensagemStatus = document.getElementById('mensagem-status');
// Busca todos os produtos na API e os exibe na tela
async function carregarProdutos() {
    try {
        
        const resposta = await fetch(API_URL);
        const produtos = await resposta.json();
        renderizarProdutos(produtos);
    } catch (erro) {
    console.error('Erro ao carregar produtos:', erro);
    }
}

function renderizarProdutos(produtos) {
  listaProdutos.innerHTML = '';
  if (produtos.length === 0) {
    listaProdutos.innerHTML =
      '<li>Nenhum produto cadastrado.</li>';
    return;
  }
  produtos.forEach((produto) => {
    const item = document.createElement('li');
    item.innerHTML = `
	<div class="produto-info">
                    <strong>${produto.nome}</strong>
                    <span>${produto.descricao}</span>
	</div>
	<div style="display:flex; align-items:center;">
                    <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
	     <button class="btn-excluir" data-id="${produto._id}">Excluir</button>
              </div>
    `;
    listaProdutos.appendChild(item);
  });
}

formProduto.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // evita recarregar
 
  const nome = document.getElementById('nome').value;
  const descricao =
    document.getElementById('descricao').value;
  const preco =
    parseFloat(document.getElementById('preco').value);
 
  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao, preco })
    });
 
    if (!resposta.ok) throw new Error('Falha');
 
    formProduto.reset();
    mensagemStatus.textContent = 'Cadastrado!';
    carregarProdutos();
  } catch (erro) {
    mensagemStatus.textContent = 'Erro ao cadastrar.';
  }
});

// Um listener na lista trata cliques em qualquer
// botão "Excluir", mesmo os criados dinamicamente
listaProdutos.addEventListener('click', async (evento) => {
  if (!evento.target.classList
       .contains('btn-excluir')) return;
 
  const id = evento.target.dataset.id;
  const confirmar = confirm('Tem certeza?');
  if (!confirmar) return;
 
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!resposta.ok) throw new Error('Erro');
    carregarProdutos();
  } catch (erro) {
    console.error(erro);
    alert('Não foi possível excluir.');
  }
});

// Carrega os produtos assim que a página é aberta
carregarProdutos();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registro) => {
        console.log('SW registrado:',
          registro.scope);
      })
      .catch((erro) => {
        console.error('Falha ao registrar:', erro);
      });
  });
}