// Recupera o carrinho do localStorage (ou cria array vazio)
let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
window.carrinho = carrinho;

// Adiciona 1 item ao carrinho (ou incrementa qtd)
function adicionarAoCarrinho(id) {
  const idx = carrinho.findIndex(item => item.id === id);
  if (idx > -1) {
    carrinho[idx].qtd = (carrinho[idx].qtd || 1) + 1;
  } else {
    carrinho.push({ id, qtd: 1 });
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  atualizarContador();
}
window.adicionarAoCarrinho = adicionarAoCarrinho;

// Remove item pelo índice no array
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  renderCarrinho(window.produtos);
  atualizarContador();
}
window.removerDoCarrinho = removerDoCarrinho;

// Mostra o total de itens no badge (elementos com id="cart-count")
function atualizarContador() {
  const total = carrinho.reduce((sum, x) => sum + (x.qtd||1), 0);
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = total > 0 ? `(${total})` : '';
  });
}
window.atualizarContador = atualizarContador;

// Aplica cupom válido e re-renderiza o carrinho
function aplicarCupom(code) {
  const valids = ['FRETEGRATIS','SANT10','OFF20'];
  if (!valids.includes(code)) {
    alert('Cupom inválido.');
    return;
  }
  localStorage.setItem('cupom_aplicado', code);
  renderCarrinho(window.produtos);
}
window.aplicarCupom = aplicarCupom;

// 🛒 Renderiza carrinho (mantido seu código original, mas agora usa window.produtos)
function renderCarrinho(produtos) {
  const listaEl = document.getElementById('lista-carrinho');
  const subEl   = document.getElementById('subtotal');
  const totEl   = document.getElementById('total');
  const freEl   = document.getElementById('frete');
  const cupInfo = document.getElementById('cupom-info');
  if (!listaEl||!subEl||!totEl||!freEl) return;

  let cupom   = localStorage.getItem('cupom_aplicado')||'';
  let frete   = cupom==='FRETEGRATIS'?0:15.00;
  listaEl.innerHTML = '';

  if (carrinho.length===0) {
    listaEl.innerHTML = '<p class="text-center text-gray-500">Seu carrinho está vazio.</p>';
    subEl.textContent = totEl.textContent = '0.00';
  } else {
    let subtotal = 0;
    carrinho.forEach((item,i) => {
      const p = produtos.find(p=>p.id===item.id);
      if (!p) return;
      const totalItem = p.preco*(item.qtd||1);
      subtotal += totalItem;
      const div = document.createElement('div');
      div.className = "p-4 bg-white rounded shadow flex justify-between items-center";
      div.innerHTML = `
        <div>
          <h3 class="font-semibold">${p.nome}</h3>
          <p>Qtd: ${item.qtd||1} × R$ ${p.preco.toFixed(2)}</p>
        </div>
        <div class="flex gap-2 items-center">
          <p class="font-medium">R$ ${totalItem.toFixed(2)}</p>
          <button onclick="removerDoCarrinho(${i})" class="text-red-600 text-sm">✖</button>
        </div>
      `;
      listaEl.appendChild(div);
    });
    subtotal = +subtotal.toFixed(2);
    const desconto = calcularDesconto(subtotal, cupom);
    const total   = Math.max(0, subtotal+frete-desconto).toFixed(2);

    subEl.textContent  = subtotal.toFixed(2);
    totEl.textContent  = total;
    freEl.textContent  = frete.toFixed(2);
    cupInfo.textContent = cupom
      ? `Cupom "${cupom}" aplicado. Desconto R$ ${desconto.toFixed(2)}`
      : '';
    localStorage.setItem('checkout_subtotal', subtotal.toFixed(2));
    localStorage.setItem('checkout_frete', frete.toFixed(2));
    localStorage.setItem('checkout_total', total);
  }
}
window.renderCarrinho = renderCarrinho;

// desconto (mantido)
function calcularDesconto(sub,totalCupom) {
  if (!totalCupom) return 0;
  if (totalCupom==='FRETEGRATIS') return 15;
  if (totalCupom==='SANT10') return sub*0.10;
  if (totalCupom==='OFF20' && sub>=150) return 20;
  return 0;
}


// Recupera a wishlist do localStorage (ou cria array vazio)
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
window.wishlist = wishlist;

// Adiciona ou remove um produto da wishlist
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderWishlistCount();
}
window.toggleWishlist = toggleWishlist;

// Atualiza o contador de wishlist no header
function renderWishlistCount() {
  const count = wishlist.length;
  document.querySelectorAll('#wishlist-count').forEach(el => {
    el.textContent = count > 0 ? `(${count})` : '';
  });
}
window.renderWishlistCount = renderWishlistCount;

// Chama ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderWishlistCount();
});