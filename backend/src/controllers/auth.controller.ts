import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const user: IUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();

    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET || "defaultToken"
    );

    res.header("auth-token", token).json(savedUser);
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Wrong email");

    const correctPassword: boolean = await user.validatePassword(
      req.body.password
    );
    if (!correctPassword) return res.status(400).json("Invalid password");

    const token: string = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET || "defaultToken",
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.header("auth-token", token).json(user);
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json("User not found");

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const profileName = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    res.json(user.username);
  } catch (error) {
    console.error("Error fetching profile name:", error);
    res.status(500).json("Internal Server Error");
  }
};

export const changeRole = async (req: Request, res: Response) => {
  try {
    const admin = await User.findById(req.userId);
    if (!admin || admin.role !== "super_administrator") {
      return res.status(401).json(`Access Denied`);
    } else {
      const user = await User.findById(req.body.user_id);
      if (!user) return res.status(404).json("User not found");
      await user.updateOne({ role: req.body.new_role });

      res.json(`User: ${user.username} is now ${req.body.new_role}`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const createModerator = async (req: Request, res: Response) => {
  try {
    const admin = await User.findById(req.userId);
    const user = await User.findById(req.body.user_id);
    if (
      !admin ||
      (admin.role !== "super_administrator" && admin.role !== "administrator")
    ) {
      return res.status(401).json("Access Denied");
    } else {
      if (!user) return res.status(404).json("User not found");
      await user.updateOne({ role: "moderator" });
      res.json(`User: ${user.username} is now moderator`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

export const muteAuthor = async (req: Request, res: Response) => {
  try {
    const admin = await User.findById(req.userId);
    const user = await User.findById(req.body.user_id);
    if (
      !admin ||
      (admin.role !== "super_administrator" && admin.role !== "administrator")
    ) {
      return res.status(401).json("Access Denied");
    } else {
      if (!user) return res.status(404).json("User not found");
      await user.updateOne({ muted: true });
      res.json(`User ${user.username} is muted now`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};
