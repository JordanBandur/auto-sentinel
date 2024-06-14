const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerHandler = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Something has gone wrong' });
  }
};

module.exports = registerHandler;