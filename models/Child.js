module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
      name: DataTypes.STRING,
      grade: DataTypes.STRING,
      gender: DataTypes.STRING,
      school: DataTypes.STRING,
      schoolLocationLat: DataTypes.FLOAT,
      schoolLocationLng: DataTypes.FLOAT,
    });
  
    Child.associate = (models) => {
      Child.belongsTo(models.Parent);
    };
  
    return Child;
  };
  