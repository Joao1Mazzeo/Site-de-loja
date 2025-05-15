// js/search.js - Autocomplete de busca para window.produtos
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const list  = document.getElementById('search-suggestions');
  
    if (!input || !list) return;
  
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        list.innerHTML = '';
        list.classList.add('hidden');
        return;
      }
  
      // Filtra até 5 produtos correspondentes
      const matches = (window.produtos || [])
        .filter(p => p.nome.toLowerCase().includes(q))
        .slice(0, 5);
  
      if (matches.length === 0) {
        list.innerHTML = '<li class="px-4 py-2 text-gray-500">Nenhum resultado encontrado</li>';
      } else {
        list.innerHTML = matches.map(p =>
          `<li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" onclick="window.location.href='produto.html?id=${p.id}'">${p.nome}</li>`
        ).join('');
      }
  
      list.classList.remove('hidden');
    });
  
    // Fecha sugestões ao clicar fora
    document.addEventListener('click', e => {
      if (!input.contains(e.target) && !list.contains(e.target)) {
        list.classList.add('hidden');
      }
    });
  });
  