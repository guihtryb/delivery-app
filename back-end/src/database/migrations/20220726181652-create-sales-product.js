module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('salesProducts', {
      sale_id: {
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'sales',
        },
        type: Sequelize.INTEGER,
      },

      product_id: {
        allowNull: false,
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          key: 'id',
          model: 'products',
        },
        type: Sequelize.INTEGER,
      },

      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('salesProducts');
  }
};