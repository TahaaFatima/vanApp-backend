module.exports = (sequelize, DataTypes) => {
    const Parent = sequelize.define('Parent', {
      fullName: DataTypes.STRING,
    });
  
    Parent.associate = (models) => {
      Parent.belongsTo(models.User);
      Parent.hasMany(models.Child);
      Parent.hasOne(models.PickupLocation);
      Parent.hasOne(models.EmergencyContact);
    };
  
    return Parent;
  };
  