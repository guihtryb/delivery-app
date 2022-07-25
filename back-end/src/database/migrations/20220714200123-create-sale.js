module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },

      seller_id: {
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        },
        type: Sequelize.INTEGER,
      },

      total_price: {
        type: Sequelize.DECIMAL(10, 2),
      },

      delivery_address: {
        type: Sequelize.STRING(100),
      },

      delivery_number: {
        type: Sequelize.STRING(50),
      },

      sale_date: {
        type: Sequelize.DATE,
      },

      status: {
        type: Sequelize.STRING(50),
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};