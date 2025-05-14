// i18n.js
const I18N = {
    translations: {
        pt: {
            searchPlaceholder: "Pesquisar produtos...",
            priceLabel: "Preço:",
            // ... outros textos
        },
        en: {
            searchPlaceholder: "Search products...",
            priceLabel: "Price:",
            // ... other texts
        }
    },

    updateTexts(lang) {
        document.getElementById('searchInput').placeholder = this.translations[lang].searchPlaceholder;
        // Atualizar todos os elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = this.translations[lang][key];
        });
    }
};