const Storage = {
    /**
     * Recupera todos os produtos do localStorage
     * @returns {Array} Lista de produtos
     */
    getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    },

    /**
     * Salva uma lista de produtos no localStorage
     * @param {Array} products Lista de produtos
     */
    saveProducts(products) {
        // Validação básica
        if (!Array.isArray(products)) {
            console.error('Erro: Não é um array válido');
            return;
        }
        
        localStorage.setItem('products', JSON.stringify(products));
    },

    /**
     * Gera um novo ID único para os produtos
     * @returns {number} Novo ID
     */
    getNextId() {
        const products = this.getProducts();
        if (products.length === 0) return 1;
        return Math.max(...products.map(p => p.id)) + 1;
    }
};