module.exports = (sequelize, DataTypes) => {
    const PickupLocation = sequelize.define('PickupLocation', {
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
    });
  
    PickupLocation.associate = (models) => {
      PickupLocation.belongsTo(models.Parent);
    };
  
    return PickupLocation;
  };
  