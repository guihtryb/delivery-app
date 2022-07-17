'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('products',
    [
      {
        name: 'Becks 330ml',
        price: 4.49,
        url_image: 'https://www.ambev.com.br/conteudo/uploads/2019/03/becks_330ml.png'
      },
      {
        name: 'Becks 330ml',
        price: 4.49,
        url_image: 'https://www.ambev.com.br/conteudo/uploads/2019/03/becks_330ml.png'
      },
      {
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        url_image: 'https://www.tiaozinho.com/produto-imagem/500/cerveja-antarctica-pilsen-300ml-6e9cdcee39587e06e38679c4f9d06aa5.jpg'
      },
      {
        name: 'Heineken 600ml',
        price: 7.50,
        url_image: 'https://www.tiaozinho.com/produto-imagem/500/cerveja-antarctica-pilsen-300ml-6e9cdcee39587e06e38679c4f9d06aa5.jpg'
      },
      {
        name: 'Brahma Duplo Malte 350ml',
        price: 2.79,
        url_image: 'https://www.tiaozinho.com/produto-imagem/500/cerveja-antarctica-pilsen-300ml-6e9cdcee39587e06e38679c4f9d06aa5.jpg'
      },
      {
        name: 'Skol Beats Senses',
        price: 3.57,
        url_image: 'https://www.tiaozinho.com/produto-imagem/500/cerveja-antarctica-pilsen-300ml-6e9cdcee39587e06e38679c4f9d06aa5.jpg'
      },
      {
        name: 'Brahma',
        price: 2.19,
        url_image: 'https://www.tiaozinho.com/produto-imagem/500/cerveja-antarctica-pilsen-300ml-6e9cdcee39587e06e38679c4f9d06aa5.jpg'
      },
      {
        name: 'Skol Beats Long Neck',
        price: 4.49,
        url_image: 'https://www.tiaozinho.com/produto-imagem/500/cerveja-antarctica-pilsen-300ml-6e9cdcee39587e06e38679c4f9d06aa5.jpg'
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('products', null, {}),
};