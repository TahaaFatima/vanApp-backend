module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      email: { type: DataTypes.STRING, unique: true },
      phone: DataTypes.STRING,
      role: DataTypes.ENUM('parent', 'driver'),
      profilePicture: DataTypes.STRING,
      password: {  type: DataTypes.STRING,
        allowNull: false, },
    });
  
    User.associate = (models) => {
      User.hasOne(models.Parent);
      User.hasOne(models.Driver);
    };
  
    return User;
  };
  