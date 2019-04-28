/* jshint indent: 2 */


module.exports = function (sequelize, DataTypes) {
  const Actor = sequelize.define('actor', {
    id: {
      type: DataTypes.INTEGER,
      field: 'actor_id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('now')
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'actor',
  });

  return Actor;
}
