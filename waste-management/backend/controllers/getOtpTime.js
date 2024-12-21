const User = require("../models/User");

const getOtpTime = async (req, res, next) => {
  const { token } = req.body;
  try {
    const foundUser = await User.findOne({ "otp.token": token }).select(
      "otp"
    ); //finding user by token
    if (!foundUser) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      message: "Success",
      status: true,
      sendTime:foundUser.otp.sendTime
    });
  } catch (error) {
    next(error);
  }
};
module.exports=getOtpTime;