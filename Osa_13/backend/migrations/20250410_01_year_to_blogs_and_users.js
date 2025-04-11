const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      min: 1991,
      max: 2025
    })
    await queryInterface.addColumn('users', 'year', {
      type: DataTypes.INTEGER,
      min: 1991,
      max: 2025
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
    await queryInterface.removeColumn('users', 'year')
  },
}