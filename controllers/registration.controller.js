const { User, Parent, Driver, Child, EmergencyContact, PickupLocation } = require('../models');

exports.registerParent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      children,
      emergencyName,
      emergencyPhone,
      emergencyRelation,
      pickupLat,
      pickupLng,
    } = req.body;

    const profilePicture = req.file ? req.file.path : null;

    const user = await User.create({ email, phone, role: 'parent', profilePicture });
    const parent = await Parent.create({ fullName, userId: user.id });

    if (children) {
      const childrenParsed = JSON.parse(children);
      for (let child of childrenParsed) {
        await Child.create({ ...child, parentId: parent.id });
      }
    }

    await EmergencyContact.create({
      name: emergencyName,
      phoneNumber: emergencyPhone,
      relation: emergencyRelation,
      parentId: parent.id,
    });

    await PickupLocation.create({
      latitude: pickupLat,
      longitude: pickupLng,
      parentId: parent.id,
    });

    res.status(201).json({ message: 'Parent registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerDriver = async (req, res) => {
  try {
    const {
      email,
      phone,
      password,
      vehicleRegNumber,
      vehicleType,
      vehicleCapacity,
    } = req.body;

    const profilePicture = req.files['profilePicture']?.[0]?.path || null;
    const cnicOrLicensePath = req.files['cnicOrLicense']?.[0]?.path || null;

    const user = await User.create({ email, phone, role: 'driver', profilePicture });

    await Driver.create({
      userId: user.id,
      password,
      cnicOrLicensePath,
      vehicleRegNumber,
      vehicleType,
      vehicleCapacity,
    });

    res.status(201).json({ message: 'Driver registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
