import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized access. Token missing or malformed.",
        });
    }
    const token = authHeader.replace("Bearer ", "");

    console.log("token:-", token);
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:-", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized access" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Internal server error while Authenticating user", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while Authenticating user",
      });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied." });
  }
  next();
};
