/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('film', {
    film_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language',
        key: 'language_id'
      }
    },
    rental_duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '3'
    },
    rental_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '4.99'
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    replacement_cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '19.99'
    },
    rating: {
      type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
      allowNull: true,
      defaultValue: 'G'
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    },
    special_features: {
      type: 'ARRAY',
      allowNull: true
    },
    fulltext: {
      type: 'TSVECTOR',
      allowNull: false
    }
  }, {
    tableName: 'film'
  })
}
