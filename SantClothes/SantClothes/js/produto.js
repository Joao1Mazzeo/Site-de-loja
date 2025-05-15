// produto.js - banco central de produtos
const produtos = [
  {
    id: 1,
    nome: "Camiseta Básica",
    preco: 49.90,
    imagens: ["https://source.unsplash.com/random/800x800?shirt"],
    descricao: "Camiseta confortável de algodão, ideal para o dia a dia.",
    categoria: "masculino"
  },
  {
    id: 2,
    nome: "Calça Jeans",
    preco: 89.90,
    imagens: ["https://source.unsplash.com/random/800x800?jeans"],
    descricao: "Calça jeans com corte moderno e tecido resistente.",
    categoria: "masculino"
  },
  {
    id: 3,
    nome: "Tênis Esportivo",
    preco: 159.90,
    imagens: ["https://source.unsplash.com/random/800x800?sneakers"],
    descricao: "Tênis ideal para caminhadas e treinos.",
    categoria: "masculino"
  },
  {
    id: 4,
    nome: "Relógio de Pulso",
    preco: 199.90,
    imagens: ["https://source.unsplash.com/random/800x800?watch"],
    descricao: "Relógio analógico elegante com pulseira de couro.",
    categoria: "acessorios"
  },
  {
    id: 5,
    nome: "Jaqueta de Couro",
    preco: 299.90,
    imagens: ["https://source.unsplash.com/random/800x800?jacket"],
    descricao: "Jaqueta sintética com visual clássico vitoriano.",
    categoria: "feminino"
  },
  {
    id: 6,
    nome: "Boné Estiloso",
    preco: 39.90,
    imagens: ["https://source.unsplash.com/random/800x800?hat"],
    descricao: "Boné estiloso com aba curva e ajuste traseiro.",
    categoria: "acessorios"
  }
];

window.produtos = produtos;
// produto.js - Gerador dinâmico de produtos com IDs sequenciais
(function() {
  // Lista de possíveis partes de nome
  const adjectives = ['Estiloso', 'Clássico', 'Moderno', 'Elegante', 'Casual', 'Esportivo', 'Vitoriano', 'Luxo', 'Urbano', 'Minimalista'];
  const items = ['Camisa', 'Calça', 'Boné', 'Jaqueta', 'Tênis', 'Relógio', 'Bolsa', 'Óculos', 'Saia', 'Vestido'];
  const categories = ['masculino', 'feminino', 'acessorios'];

  function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomName() {
    return `${randomElement(adjectives)} ${randomElement(items)}`;
  }

  function randomPrice() {
    return parseFloat((Math.random() * 200 + 20).toFixed(2));
  }

  function randomDescription(name) {
    return `Descrição exclusiva para ${name}, combinando qualidade e estilo.`;
  }

  function generateProducts(count = 12) {
    const list = [];
    for (let i = 1; i <= count; i++) {
      const nome = randomName();
      const preco = randomPrice();
      const categoria = randomElement(categories);
      const encoded = encodeURIComponent(nome);
      const imagens = [`https://placehold.co/800x800?text=${encoded}`];
      const descricao = randomDescription(nome);
      list.push({ id: i, nome, preco, imagens, descricao, categoria });
    }
    return list;
  }

  // Gera 12 produtos ao carregar
  const produtos = generateProducts(12);
  window.produtos = produtos;
})();
