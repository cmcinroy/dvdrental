/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('payment', {
    payment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customer',
        key: 'customer_id'
      }
    },
    staff_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'staff_id'
      }
    },
    rental_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rental',
        key: 'rental_id'
      }
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'payment'
  })
}
