const UserServices = require("../services/userServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email, password, age, gender, weight, height, goal, activity } =
      req.body;

    const duplicateUser = await UserServices.getUserByEmail(email);
    if (duplicateUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await UserServices.registerUser(
      email,
      password,
      age,
      gender,
      weight,
      height,
      goal,
      activity
    );

    res.json({ status: "success", message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserServices.checkUser(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let tokenData;
    tokenData = {
      id: user._id,
      email: user.email,
    };

    const jwtSecretKey = "A123";

    const token = await UserServices.generateToken(
      tokenData,
      jwtSecretKey,
      "1h"
    );

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
