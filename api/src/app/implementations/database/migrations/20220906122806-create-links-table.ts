'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('links', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      urlHash: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      pageViews: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        default: 0
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
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('links')
  }
}
