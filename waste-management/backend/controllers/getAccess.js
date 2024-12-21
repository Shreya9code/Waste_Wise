const User = require("../models/User");

const getAccess = async (req, res, next) => {
  const { token } = req.body;

  try {
    const foundUser = await User.findOne({ "otp.token": token }); //finding user by email
    if (!foundUser) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      message: "Success",
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAccess;
