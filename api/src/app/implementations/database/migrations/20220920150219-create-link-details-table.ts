'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('linkDetails', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      linkId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'links', key: 'id' }
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      value: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('linkDetails')
  }
}
