import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetcookie } from "../utils/generateTokenAndSetCookie.js"; // ✅ Ensure this path is correct
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists");

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();
    generateTokenAndSetcookie(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "invaild or expired verifaction code",
        });
    }
    user.isVerified = true;
    user.verificationTokenExpiresAt = undefined;
    user.verificationToken = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    console.log("error in varify", error);

    res.status(500).json({ success: false, message: "server error " });
  }
};
export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
