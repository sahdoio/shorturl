'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch link IDs from the links table
    const links = await queryInterface.sequelize.query(
      `SELECT id FROM links`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const linkDetails = []
    links.forEach(link => {
      // For each link, create a linkDetail entry
      linkDetails.push({
        linkId: link.id, // Using the actual link ID from the database
        name: `DetailNameForLink${link.id}`, // Example detail name
        value: `DetailValueForLink${link.id}`, // Example detail value
      })
    })

    return queryInterface.bulkInsert('linkDetails', linkDetails)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('linkDetails', null, {})
  }
}
