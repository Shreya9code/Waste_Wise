const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const formattedEmail = email.toLowerCase();
    const foundUser = await User.findOne({ email: formattedEmail }); //finding user by email
    if (!foundUser) {
      const error = new Error("No user found by this email");
      error.statusCode = 400;
      throw error;
    }
    const isPassMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPassMatch) {
      const error = new Error("Wrong password");
      error.statusCode = 400;
      throw error;
    }
    const accessToken = jwt.sign(
      {
        email: formattedEmail,
        userId: foundUser._id,
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "7d" }
    );
    res
      .status(200)
      .json({ message: "Logged in successfully", status: true, token: accessToken });
  } catch (error) {
    next(error);
  }
};

module.exports=login