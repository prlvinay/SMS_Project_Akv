const sendResponse = (res, status, message, data = {}) => {
  return res.status(status).json({
    success: status < 400,
    message,
    data,
  });
};

module.exports = { sendResponse };
