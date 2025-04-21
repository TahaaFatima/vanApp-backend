const { Driver, User } = require('../models');

exports.getDriverProfile = async (req, res) => {
  try {
    const driverId = req.params.id;

    const driver = await Driver.findOne({
      where: { id: driverId },
      include: [
        { model: User, attributes: ['email', 'phone', 'profilePicture'] },
      ],    
    });

    console.log(driver);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.status(200).json({
      vehicleRegNumber: driver.vehicleRegNumber,
      vehicleType: driver.vehicleType,
      vehicleCapacity: driver.vehicleCapacity,
      userId: driver.userId,
      licenseNumber: driver.cnicOrLicensePath.split('/').pop(),
      cnicOrLicensePath: driver.cnicOrLicensePath,
      name: driver.name,
      phone: driver.User.phone,
      email: driver.User.email,
      profilePicture: driver.User.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
