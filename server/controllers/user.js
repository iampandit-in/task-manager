import Joi from "joi"
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const SignUpSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const generateToken = (getId) => {
  return jwt.sign({getId}, process.env.JWT_SECRET, {expiresIn: "1d"}) 
}

const SignUp = async (req, res, next) => {
  const {name, email, password} = req.body;
  const {error, value} = SignUpSchema.validate({name, email, password});
  if(error){
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }
    try {
        const EmailExists = await User.findOne({email})
        if(EmailExists){
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
        } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hashPassword});
        if (newUser) {
          const token = generateToken(newUser._id);
          res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
          })
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "User creation failed",
        error: error.message
      })
    }
}

const SignInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

const SignIn = async (req, res, next) => {
    const {email, password} = req.body;
    const {error, value} = SignInSchema.validate({email, password});
    if(error){
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }
      try {
          const user = await User.findOne({email})
          if(!user){
              return res.status(400).json({
                  success: false,
                  message: "User not found",
              })
          } else {
          const isPasswordMatched = await bcrypt.compare(password, user.password);
          if(isPasswordMatched){
            const token = generateToken(user._id);
            res.cookie("token", token, {
              withCredentials: true,
              httpOnly: true,
              secure: false,
              sameSite: "lax",
              maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
              success: true,
              message: "User signed in successfully",
              data: user
            })
          }
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "User sign in failed",
          error: error.message
        })
      }
}

export { SignUp, SignIn };