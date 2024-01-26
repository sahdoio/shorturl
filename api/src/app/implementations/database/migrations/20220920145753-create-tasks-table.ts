'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('tasks', { 
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
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      statusId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'taskStatus', key: 'id' }
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
    return queryInterface.dropTable('tasks');
  }
};
