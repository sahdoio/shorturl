'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('userTasks', { 
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      taskId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tasks', key: 'id' }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('userTasks');
  }
};
