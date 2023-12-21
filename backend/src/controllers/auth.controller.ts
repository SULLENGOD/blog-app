import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from "../libs/errorHandling";

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
    const user = new User(req.body);
    user.password = await user.encryptPassword(user.password);

    const savedUser = await user.save();

    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env.TOKEN_SECRET || "defaultToken"
    );

    res.header("auth-token", token).json({ userId: savedUser._id });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error during sigin: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new AuthenticationError("Invalid email or password");
    }

    if (!(await user.validatePassword(req.body.password))) {
      throw new AuthenticationError("Invalid email or password");
    }

    const token: string = jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET || "defaultToken",
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.header("auth-token", token).json({ userId: user._id });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error during sigin: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
    const user = await User.findById(req.userId, { password: 0 });
    res.json(user);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error fetching profile: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError("User not found");

    res.json(user.username);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error fetching Author name: ", error);
      res.status(509).json({ message: "Internal server error" });
    }
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
    const admin = await User.findById(req.userId);
    if (!admin || admin.role !== "super_administrator") {
      throw new UnauthorizedError("Access Denied");
    }
    const user = await User.findById(req.body.user_id);
    if (!user) return res.status(404).json("User not found");

    await user.updateOne({ role: req.body.new_role });

    res.json({ message: `User ${user.username} is now ${req.body.new_role}` });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error during role change:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
    const admin = await User.findById(req.userId);
    if (
      !admin ||
      !["super_administrator", "administrator"].includes(admin.role)
    ) {
      throw new UnauthorizedError("Access Denied");
    }

    const user = await User.findById(req.body.user_id);
    if (!user) throw new NotFoundError("User not found");

    await user.updateOne({ role: "moderator" });
    res.json({ message: `User: ${user.username} is now moderator` });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error creating moderator:", error);
      res.status(500).json({ message: "Internal server error" });
    }
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
    const admin = await User.findById(req.userId);
    if (
      !admin ||
      !["super_administrator", "administrator"].includes(admin.role)
    ) {
      throw new UnauthorizedError('Access Denied');
    }
    const user = await User.findById(req.body.user_id);
    if (!user) throw new NotFoundError('User not found');

    await user.updateOne({ muted: true });
    res.json(`User ${user.username} is muted now`);

  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error creating moderator:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
