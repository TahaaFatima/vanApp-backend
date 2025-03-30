module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: { type: DataTypes.STRING, unique: true },
      phone: DataTypes.STRING,
      role: DataTypes.ENUM('parent', 'driver'),
      profilePicture: DataTypes.STRING,
    });
  
    User.associate = (models) => {
      User.hasOne(models.Parent);
      User.hasOne(models.Driver);
    };
  
    return User;
  };
  