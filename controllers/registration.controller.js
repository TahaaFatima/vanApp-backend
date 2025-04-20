const { User, Parent, Driver, Child, EmergencyContact, PickupLocation } = require('../models');
const bcrypt = require('bcryptjs');

exports.registerParent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      children,
      emergencyName,
      emergencyPhone,
      emergencyRelation,
      pickupLat,
      pickupLng,
    } = req.body;

    const profilePicture = req.file ? req.file.path : null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, phone, password: hashedPassword, role: 'parent', profilePicture });
    console.log(user);
    const parent = await Parent.create({ fullName, userId: user.id });
    console.log(parent);
    if (children) {
      const childrenParsed = JSON.parse(children);
      for (let child of childrenParsed) {
        await Child.create({ ...child, parentId: parent.id });
      }
    }

    // await EmergencyContact.create({
    //   name: emergencyName,
    //   phoneNumber: emergencyPhone,
    //   relation: emergencyRelation,
    //   parentId: parent.id,
    // });

    // await PickupLocation.create({
    //   latitude: pickupLat,
    //   longitude: pickupLng,
    //   parentId: parent.id,
    // });

    res.status(201).json({ message: 'Parent registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
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
    const hashedPassword = await bcrypt.hash(password, 10);

    const cnicOrLicensePath = req.files['cnicOrLicense']?.[0]?.path || null;

    const user = await User.create({ email, phone, password: hashedPassword, role: 'driver', profilePicture });

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
