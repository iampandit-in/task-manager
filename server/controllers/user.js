import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const generateToken = (getId) => {
  return jwt.sign({getId}, process.env.JWT_SECRET, {expiresIn: "1d"}) 
}

const SignUp = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, email, password)",
      });
    }

    // Check if email already exists
    const EmailExists = await User.findOne({email});
    if (EmailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password and create user
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({name, email, password: hashPassword});

    // Generate token
    const token = generateToken(newUser._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Remove password from response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      data: userResponse
    });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({
      success: false,
      message: "User sign up failed",
      error: error.message
    });
  }
}

const SignIn = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Remove password from response
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: userResponse
    });
  } catch (error) {
    console.error("SignIn error:", error);
    return res.status(500).json({
      success: false,
      message: "User sign in failed",
      error: error.message
    });
  }
}

const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to req by authenticateToken middleware
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user
    });
  } catch (error) {
    console.error("GetCurrentUser error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get current user",
      error: error.message
    });
  }
}

const SignOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    console.error("SignOut error:", error);
    return res.status(500).json({
      success: false,
      message: "User sign out failed",
      error: error.message,
    });
  }
}

export { SignUp, SignIn, getCurrentUser, SignOut };