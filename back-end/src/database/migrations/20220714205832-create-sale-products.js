'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('saleProducts', {
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'sale',
          key: 'id',
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'product',
          key: 'id',
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      refere
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('saleProducts');
  }
};