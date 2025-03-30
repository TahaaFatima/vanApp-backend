module.exports = (sequelize, DataTypes) => {
    const EmergencyContact = sequelize.define('EmergencyContact', {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      relation: DataTypes.STRING,
    });
  
    EmergencyContact.associate = (models) => {
      EmergencyContact.belongsTo(models.Parent);
    };
  
    return EmergencyContact;
  };
  