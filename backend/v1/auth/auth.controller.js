const { registerUser, loginUser } = require('./auth.service');
const { sendResponse } = require('../../utils/responseHandler');

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const user = await registerUser(username, email, phone, password);
    return sendResponse(res, 201, 'User registered successfully', { user });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message || 'Server error');
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.cookie("access_token",token);

    if (token) {
      return sendResponse(res, 200, 'Login successful', { token });
    } else {
      return sendResponse(res, 400, 'Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, error.message || 'Server error');
  }
};

module.exports = { register, login };
