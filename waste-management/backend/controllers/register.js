const User = require("../models/User");
const bcrypt = require("bcrypt");
//const Joi = require("joi");
const joi = require("joi");

//request response nextError
const register = async (req, res, next) => {
  const { error: validationError } = validateUser(req.body);

  const { name, email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formattedName = name.toLowerCase();
    const formattedEmail = email.toLowerCase();

    const foundUser = await User.findOne({ email: formattedEmail }); //finding user by email
    if (foundUser) {
      const error = new Error("This email already exists");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10); //strong pass

    const newUser = new User({
      //user from model
      name: formattedName,
      email: formattedEmail,
      password: hashedPassword,
    });

    const saveduser = await newUser.save();

    res.status(200).json({ message: "User registered successfully",status:true });
  } catch (error) {
    next(error);
  }
};

function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
module.exports=register;
