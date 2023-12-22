import { Request, Response } from "express";
import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from "../libs/errorHandling";
import {
  authenticateUser,
  modifyRole,
  muteAnAuthor,
  newUser,
  upgradeToModerator,
  userInfo,
} from "../services/auth.service";

/**
 * @summary Creates a new user account.
 * @description Encrypts the password before saving it to the database.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response containing the user ID and auth token.
 * @throws {AuthenticationError} If the email address is already in use.
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { token, userId } = await newUser(req.body);

    res.header("auth-token", token).json({ userId: userId });
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
 * @summary Authenticates a user and generates an auth token.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response containing the user ID and auth token.
 * @throws {AuthenticationError} If the email or password is incorrect.
 */
export const signin = async (req: Request, res: Response) => {
  try {
    const { token, userId } = await authenticateUser(req.body);

    res.header("auth-token", token).json({ userId: userId });
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
 * @summary Retrieves the current user's profile information.
 * @description Excludes the password field for security.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response containing the user's profile data.
 * @throws {AuthenticationError} If the user is not authenticated.
 */
export const profile = async (req: Request, res: Response) => {
  try {
    const user = await userInfo(req.userId);

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
 * @summary Retrieves a user's profile name by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response containing the user's profile name.
 * @throws {NotFoundError} If the user is not found.
 */
export const profileName = async (req: Request, res: Response) => {
  try {
    const user = await userInfo(req.params.id);
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
 * @summary Changes a user's role.
 * @description Requires super administrator privileges.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response confirming the role change.
 * @throws {UnauthorizedError} If the user is not authorized to make the change.
 * @throws {NotFoundError} If the user to be modified is not found.
 */
export const changeRole = async (req: Request, res: Response) => {
  try {
    const user = await modifyRole(
      req.userId,
      req.body.user_id,
      req.body.new_role
    );

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
 * @summary Creates a moderator account.
 * @description Requires administrator or super administrator privileges.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response confirming the moderator creation.
 * @throws {UnauthorizedError} If the user is not authorized to create moderators.
 * @throws {NotFoundError} If the user to be modified is not found.
 */
export const createModerator = async (req: Request, res: Response) => {
  try {
    const user = await upgradeToModerator(req.userId, req.body.user_id);
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
 * @summary Mutes a user's authoring privileges.
 * @description Requires administrator or super administrator privileges.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Response} A JSON response confirming the muting action.
 * @throws {UnauthorizedError} If the user is not authorized to mute authors.
 * @throws {NotFoundError} If the user to be muted is not found.
 */
export const muteAuthor = async (req: Request, res: Response) => {
  try {
    const user = await muteAnAuthor(req.userId, req.body.user_id);
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
