document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    // Carregar produtos
    function loadProducts() {
        const products = Storage.getProducts();
        productList.innerHTML = products.map(product => `
            <div class="product-item">
                <h3>${product.name}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <button data-id="${product.id}" class="edit-btn">Editar</button>
                <button data-id="${product.id}" class="delete-btn">Excluir</button>
            </div>
        `).join('');

        // Adicionar event listeners
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editProduct(btn.dataset.id));
        });
    }

    // Excluir produto
    function deleteProduct(id) {
        if (!confirm('Deseja realmente excluir este produto?')) return;
        
        const products = Storage.getProducts().filter(p => p.id !== Number(id));
        Storage.saveProducts(products);
        loadProducts();
    }

    // Editar produto
    function editProduct(id) {
        const product = Storage.getProducts().find(p => p.id === Number(id));
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('productName').value = product.name;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productPrice').value = product.price;
        }
    }

    // Salvar produto
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validação básica
        const requiredFields = [
            document.getElementById('productName').value,
            document.getElementById('productPrice').value
        ];

        if (requiredFields.some(field => !field)) {
            alert('Preencha todos os campos obrigatórios');
            return;
        }

        const productData = {
            id: document.getElementById('productId').value || Storage.getNextId(),
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseFloat(document.getElementById('productPrice').value),
            category: 'roupas' // Categoria fixa
        };

        const products = Storage.getProducts();
        const index = products.findIndex(p => p.id === productData.id);
        
        if (index > -1) {
            products[index] = productData;
            alert('Produto atualizado com sucesso!');
        } else {
            products.push(productData);
            alert('Produto cadastrado com sucesso!');
        }

        Storage.saveProducts(products);
        loadProducts();
        form.reset();
    });

    // Inicialização
    loadProducts();
});