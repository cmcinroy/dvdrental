/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('inventory', {
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    film_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'film',
        key: 'film_id'
      }
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'inventory'
  })
}
