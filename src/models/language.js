/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('language', {
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'language'
  })
}
