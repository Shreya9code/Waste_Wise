const User = require("../models/User");

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const foundUser = await User.findOne({ "otp.otp": otp }); //finding user by otp
    if (!foundUser) {
      const error = new Error("Invalid OTP");
      error.statusCode = 400;
      throw error;
    }

    if (new Date(foundUser.otp.sendTime).getTime() < new Date().getTime()) {
      const error = new Error("OTP expired");
      throw error;
    }
    foundUser.otp.otp=null;//if verified, no need to store
    await foundUser.save();
    res.status(200).json({
        message: "OTP verified successfully",
        status: true,})
  } catch (error) {
    next(error);
  }
};
module.exports=verifyOtp