'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const links = []
    for (let i = 1; i <= 1000; i++) {
      links.push({
        url: `https://example.com/page${ i }`,
        urlHash: `hash${ i }`,
        pageViews: Math.floor(Math.random() * 100), // Random page view count for demonstration
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    return queryInterface.bulkInsert('links', links)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('links', null, {})
  }
}
