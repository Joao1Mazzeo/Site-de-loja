// script.js
document.querySelector('.btn-primary').addEventListener('click', () => {
    const categoria = document.getElementById('categoria').value;
    const preco = document.getElementById('preco').value;
    console.log(`Filtrando por categoria: ${categoria} e preço até: ${preco}`);
    // Aqui você pode adicionar lógica para filtrar produtos dinamicamente
});