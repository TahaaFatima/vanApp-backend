module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      cnicOrLicensePath: DataTypes.STRING,
      vehicleRegNumber: DataTypes.STRING,
      vehicleType: DataTypes.STRING,
      vehicleCapacity: DataTypes.INTEGER,
    });
  
    Driver.associate = (models) => {
      Driver.belongsTo(models.User);
    };
  
    return Driver;
  };
  