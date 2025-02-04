const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { generateToken } = require('../../helpers/authHelpers');

const registerUser = async (username, email, phone, password) => {
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    throw new Error('User with this email or phone already exists');
  }
  const user = new User({ username, email, phone, password });
  await user.save();
  return user;
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user ) {
    throw new Error('Invalid credentials or account inactive user1');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials pasword');
  }
  
  return generateToken(user._id);
};

module.exports = { registerUser, loginUser };
