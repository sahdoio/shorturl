'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('taskStatus', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('taskStatus');
  }
};
