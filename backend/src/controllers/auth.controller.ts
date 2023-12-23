import { Request, Response } from "express";
import {
  AuthenticationError,
  NotFoundError,
  UnauthorizedError,
} from "../libs/errorHandling";
import {
  authenticateUser,
  deleteAuthor,
  modifyRole,
  muteAnAuthor,
  newUser,
  updateAuthorInfo,
  upgradeToModerator,
  userInfo,
} from "../services/auth.service";

/**
 * Creates a new user account.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response containing the user ID and authentication token.
 * @throws AuthenticationError - If the signup credentials are invalid.
 * @throws Error - If an unexpected error occurs during signup.
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
 * Authenticates a user and generates an authentication token.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response containing the user ID and authentication token.
 * @throws AuthenticationError - If the signin credentials are invalid.
 * @throws Error - If an unexpected error occurs during signin.
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
 * Retrieves the authenticated user's profile information.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response containing the user's profile data.
 * @throws AuthenticationError - If the user is not authenticated.
 * @throws Error - If an unexpected error occurs while fetching the profile.
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
 * Retrieves the username of a specific user by ID.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response containing the user's username.
 * @throws NotFoundError - If the user with the specified ID is not found.
 * @throws Error - If an unexpected error occurs while fetching the username.
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
 * Changes the role of a specified user.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response confirming the role change.
 * @throws UnauthorizedError - If the requesting user is not authorized to change roles.
 * @throws Error - If an unexpected error occurs during the role change.
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
 * Upgrades a specified user to the moderator role.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response confirming the moderator upgrade.
 * @throws UnauthorizedError - If the requesting user is not authorized to create moderators.
 * @throws Error - If an unexpected error occurs during the moderator creation.
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
 * Mutes a specified author.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @returns - A JSON response confirming the author mute.
 * @throws UnauthorizedError - If the requesting user is not authorized to mute authors.
 * @throws Error - If an unexpected error occurs during the mute operation.
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userDelated = await deleteAuthor(req.userId, req.params.id);
    res.json({ message: `User: ${userDelated} is delated now` });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error creating moderator:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const updatedUser = updateAuthorInfo(req.userId, req.body);
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).json({ message: error.message });
    } else {
      console.error("Error creating moderator:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
