const User = require("../models/userModel");
const generateAccessToken = require("../utils/generateAccessToken");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const TOKEN_EXPIRY_TIME = 7 * 24 * 60 * 60 * 1000;

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please fill in all  the fields" });
    const user = await User.findOne({ username: username });
    // console.log(user)
    if (user) return res.status(409).json({ message: "user already exists" });

    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    const createdUser = await User.findById(savedUser._id).select("-password");
    const refreshToken = generateRefreshToken(createdUser._id);
    // res.cookie('token',token,{httpOnly:true,maxAge:10*60*1000})
    const newAccessToken = generateAccessToken(
        createdUser._id,
    );
    req.user = createdUser._id;
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "Strict",   
      maxAge: TOKEN_EXPIRY_TIME,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: TOKEN_EXPIRY_TIME,
    });
    res.status(201).json({
      message: "User created successfully",
      userId: createdUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: "'Something went wrong'" });
    console.log("User registration failed", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please fill in all  the fields" });
    const userExists = await User.findOne({ username });

    if (!userExists)
      return res.status(401).json({ message: "Invalid credentials" });

    const verifyPassword = await bcrypt.compare(password, userExists.password);
    if (!verifyPassword)
      return res.status(401).json({ message: "Invalid credentials" });
    const refreshToken = generateRefreshToken(userExists._id);
    // res.cookie('token',token,{httpOnly:true,maxAge:10*60*1000})
    const newAccessToken = generateAccessToken(
      userExists._id
    );
    // res.header("Authorization", `Bearer ${newAccessToken}`);
    // req.token = newAccessToken;
    
    
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "Strict",   
      maxAge: TOKEN_EXPIRY_TIME,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",   
      maxAge: TOKEN_EXPIRY_TIME,
    });
    req.user = userExists._id;
    // console.log(req.user)
    res.status(200).json({ token: newAccessToken, userId: userExists._id });
  } catch (error) {
    console.log("User login failed", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const logoutUser = (req,res) => {
  // const token = req.cookies.token;
  // if(!token) return res.status(401).json({message:"You are not authorized to logout"})
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.status(200).json({message:"User logged out successfully"})
};

module.exports = { registerUser, loginUser,logoutUser };
