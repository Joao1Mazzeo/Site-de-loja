document.addEventListener('DOMContentLoaded', () => {
    const products = Storage.getProducts();
    const searchInput = document.getElementById('search');
    
    /**
     * Filtra e renderiza os produtos
     * @param {string} filter - Termo de pesquisa
     */
    function renderProducts(filter = '') {
        const container = document.getElementById('products');
        container.innerHTML = '';

        // Filtragem dos produtos
        const filteredProducts = products.filter(product => {
            const searchText = [
                product.name,
                product.category,
                product.description
            ].join(' ').toLowerCase();
            
            return searchText.includes(filter.toLowerCase());
        });

        if (filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <p>Nenhum produto encontrado</p>
                </div>
            `;
            return;
        }

        // Renderização dos produtos
        filteredProducts.forEach(product => {
            container.innerHTML += `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        R$ ${product.price.toLocaleString('pt-BR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </div>
                    <div class="product-category">${product.category}</div>
                </div>
            `;
        });
    }

    // Event listener para a barra de pesquisa
    searchInput.addEventListener('input', (e) => {
        renderProducts(e.target.value);
    });

    // Inicialização
    renderProducts();
});