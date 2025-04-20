const { User } = require('../models');
const bcrypt   = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: 'Incorrect password' });

    // Optional: generate JWT token here

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
        // Add more fields as needed
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};
