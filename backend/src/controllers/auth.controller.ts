
import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

/**
 * Registers a new user.
 *
 * @param {Request} req Express request object containing user data (username, email, password).
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with saved user data (excluding password) on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur.
 * @throws {500 Internal Server Error} If any unexpected error occurs during signup.
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

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

/**
 * Authenticates an existing user and generates a JWT token.
 *
 * @param {Request} req Express request object containing login credentials (email, password).
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with user data and JWT token on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur or email is wrong.
 * @throws {400 Bad Request} If password is incorrect.
 * @throws {500 Internal Server Error} If any unexpected error occurs during login.
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

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

/**
 * Retrieves the currently logged-in user's profile information.
 *
 * @param {Request} req Express request object with user ID in headers or body.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with user data on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur.
 * @throws {404 Not Found} If the user with the provided ID is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while fetching profile.
 */
export const profile = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json("User not found");

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * Retrieves the username of a specific user.
 *
 * @param {Request} req Express request object with user ID in URL parameters.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with the user's username on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur.
 * @throws {404 Not Found} If the user with the provided ID is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while fetching username.
 */
export const profileName = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("User not found");

    res.json(user.username);
  } catch (error) {
    console.error("Error fetching profile name:", error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * Changes the role of another user (requires super_administrator privileges).
 *
 * @param {Request} req Express request object with user ID and new role in body.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with a success message and updated username and role on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur.
 * @throws {401 Unauthorized} If the logged-in user is not a super_administrator.
 * @throws {404 Not Found} If the user with the provided ID is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while changing role.
 */
export const changeRole = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

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
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * Promotes a user to moderator role.
 *
 * @param {Request} req Express request object containing the user ID to be promoted.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with a success message and updated username on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur in the request body.
 * @throws {401 Unauthorized} If the logged-in user is not authorized to promote (requires super_administrator or administrator role).
 * @throws {404 Not Found} If the user to be promoted is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while updating the user role.
 */
export const createModerator = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

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
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

/**
 * Mutes a specific user.
 *
 * @param {Request} req Express request object containing the user ID to be muted.
 * @param {Response} res Express response object.
 * @returns {Response} JSON response with a success message and username on success, or error message on failure.
 *
 * @throws {400 Bad Request} If validation errors occur in the request body.
 * @throws {401 Unauthorized} If the logged-in user is not authorized to mute (requires super_administrator or administrator role).
 * @throws {404 Not Found} If the user to be muted is not found.
 * @throws {500 Internal Server Error} If any unexpected error occurs while updating the user's muted flag.
 */
export const muteAuthor = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ erros: errors.array() });

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
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};
