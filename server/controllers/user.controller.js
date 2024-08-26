import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Assuming you're using JWT for tokens

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Send the validation error messages as a response
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ messages: errors });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ messages: ["Invalid email or password"] });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ messages: ["Invalid email or password"] });
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user: foundUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export {
  createUser,
  loginUser,
};
