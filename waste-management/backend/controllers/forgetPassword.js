const User = require("../models/User");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail")

const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const formattedEmail = email.toLowerCase();
    const foundUser = await User.findOne({ email: formattedEmail }); //finding user by email

    if (!foundUser) {
      const error = new Error("No user found by this email");
      error.statusCode = 400;
      throw error;
    }

    if (
      foundUser.otp.otp &&
      new Date(foundUser.otp.sendTime).getTime() > new Date().getTime()
    ) {
      const error = new Error(
        `Please wait until ${new Date(
          foundUser.otp.sendTime
        ).toLocaleTimeString()}`
      );
      error.statusCode = 400;
      throw error;
    }

    const otp = Math.floor(Math.random() * 90000) + 100000;
    console.log(otp);

    const token = crypto.randomBytes(32).toString("hex");
    console.log(`Generated Token: ${token}`); 
    foundUser.otp.otp = otp;
    foundUser.otp.sendTime = new Date().getTime()+1*60*1000;//ms
    foundUser.otp.token = token;

    await foundUser.save();//user with email found

    sendMail(otp,formattedEmail);//sending mail to email user

    res.status(200).json({
      message: "Please check your email for otp",
      status: true,
      token,
    });
    //console.log(res);
  } catch (error) {
    next(error);
  }
};
module.exports = forgetPassword;
