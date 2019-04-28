/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'address',
        key: 'address_id'
      }
    },
    activebool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    create_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: '(now'
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    },
    active: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'customer'
  })
}
