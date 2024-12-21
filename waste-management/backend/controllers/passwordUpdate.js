const User = require("../models/User");
const bcrypt = require("bcrypt");
const updatePassword = async (req, res, next) => {
  const { password, confirmPassword, token } = req.body;
  try {
    const foundUser = await User.findOne({ "otp.token": token }); //finding user by token

    if (!foundUser) {
      const error = new Error("Something wennt wrong");
      error.statusCode = 400;
      throw error;
    }
    //valid upto 5min
    if (
      new Date(foundUser.otp.sendTime).getTime() + 5 * 60 * 1000 <
      new Date().getTime()
    ) {
      const error = new Error("Something went wrong");
      error.statusCode = 400;
      throw error;
    }
    if (password != confirmPassword) {
      const error = new Error(
        "Password does not match with confirmed password"
      );
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10); //strong pass

    foundUser.password = hashedPassword;
    foundUser.otp.sendTime = null;
    foundUser.otp.token = null;

    await foundUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = updatePassword;
